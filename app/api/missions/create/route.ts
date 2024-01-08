import { getUserFromClerkId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { MissionValidation } from "@/lib/validation";
import { createCronJob } from "@/lib/CronJobAPIs/api";
import { changedDateFormat, generateScheduleProperty } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

export const POST = async (request: Request) => {
  try {
    const user = await getUserFromClerkId();
    const missionDataJSON = await request.json();
    missionDataJSON.status = "pending";
    missionDataJSON.InspectionTime = new Date(
      missionDataJSON.InspectionTime
    ).toISOString();

    const currentTime = new Date().toISOString();
    if (missionDataJSON.InspectionTime < currentTime) {
      return NextResponse.json({
        msg: "Inspection time should be ahead of current time",
      });
    }

    const missionData = MissionValidation.parse(missionDataJSON);

    const mission = await prisma.mission.create({
      data: {
        userId: user.id,
        ...missionData,
      },
    });

    if (!mission) {
      return NextResponse.json({
        msg: "Mission not created",
      });
    }

    // schedule the cron job

    const token = uuidv4();

    const jobData = {
      job: {
        title: mission.name,
        enabled: true,
        url: `${process.env.LUKAS_INSPECTION_URL}/api/inspection/${mission.id}`,
        saveResponses: true,
        schedule: generateScheduleProperty(mission.InspectionTime),
        extendedData: {
          headers: {
            Authorization: `${token}`,
          },
        },
      },
    };

    const cronJobData = await createCronJob(jobData);

    await prisma.mission.update({
      where: {
        id: mission.id,
        userId: user.id,
      },
      data: {
        cronJobId: cronJobData.jobId,
        cronJobToken: token,
      },
    });

    return NextResponse.json({
      message: "Mission created successfully.",
      id: mission.id,
    });
  } catch (error) {
    console.error("Error creating mission:", error);

    if (error instanceof z.ZodError) {
      // If it's a ZodError, extract the error messages
      const errorMessages = error.errors.map((e) => e.message);
      return NextResponse.json({ errors: errorMessages });
    }

    return NextResponse.json({ error });
  }
};
