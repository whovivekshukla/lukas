import { performInspection } from "@/lib/api";
import { getUserFromClerkId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import schedule from "node-schedule";

export const GET = async (request: Request, { params }) => {
  try {
    const user = await getUserFromClerkId();
    const mission = await prisma.mission.findUnique({
      where: {
        userId: user.id,
        id: params.id,
      },
    });

    console.log("mission found...");

    if (!mission || mission.userId !== user.id) {
      return NextResponse.json({ msg: "Mission Not Found" });
    }

    const checkInspectionLog = await prisma.inspectionLog.findFirst({
      where: {
        missionId: mission.id,
        mission: {
          userId: user.id,
        },
      },
    });

    if (checkInspectionLog) {
      return NextResponse.json({ log: checkInspectionLog });
    }

    // Schedule mission inspection at mission.inspectionTime
    const inspectionTime = new Date(mission.inspectionTime);
    const job = schedule.scheduleJob(inspectionTime, async () => {
      const checkForInspection = await prisma.inspectionLog.findUnique({
        where: {
          missionId: mission.id,
        },
      });

      if (checkForInspection) {
        console.log(`Inspection already completed for mission ${mission.id}`);
        return;
      }
      console.log(
        `Executing inspection for mission ${mission.id} at ${inspectionTime}`
      );

      // Update mission status to "inprogress"
      await prisma.mission.update({
        where: {
          id: mission.id,
        },
        data: {
          status: "inprogress",
        },
      });

      const resArray = [];
      const result = await performInspection(mission.waypoints, async (log) => {
        resArray.push(log);
      });

      // Create inspection log
      const newInspection = await prisma.inspectionLog.create({
        data: {
          missionId: mission.id,
          data: resArray,
        },
      });

      // Update mission status to "completed"
      await prisma.mission.update({
        data: {
          status: "completed",
        },
        where: {
          id: mission.id,
        },
      });

      console.log(`Inspection completed for mission ${mission.id}`);
    });

    console.log(
      `Scheduled inspection for mission ${mission.id} at ${inspectionTime}`
    );

    return NextResponse.json({
      msg: `Inspection scheduled for mission ${mission.id}`,
    });
  } catch (error) {
    console.error("Error creating inspection:", error);
    return NextResponse.json({ msg: "Inspection Not Found" });
  }
};
