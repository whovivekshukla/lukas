import { getUserFromClerkId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { MissionValidation } from "@/lib/validation";

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
