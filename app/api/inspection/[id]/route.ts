import { performInspection } from "@/lib/api";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import schedule from "node-schedule";

export const GET = async (request: Request, { params }) => {
  try {
    const userId = auth();
    const user = await prisma.user.findFirst({
      where: {
        clerkId: userId.userId,
      },
    });

    if (!user) {
      return NextResponse.json({ msg: "User Not Found" });
    }

    const mission = await prisma.mission.findUnique({
      where: {
        userId: user.id,
        id: params.id,
      },
    });

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
      return NextResponse.json({
        msg: `Inspection already perfomed for ${mission.name} `,
      });
    }

    const checkForInProgress = await prisma.mission.findFirst({
      where: {
        id: mission.id,
        status: "inprogress",
      },
    });

    if (checkForInProgress) {
      return NextResponse.json({
        msg: `Inspection already in progress for mission ${mission.id}`,
      });
    }

    const nodeSchedule = await prisma.nodeSchedule.create({
      data: {
        missionId: mission.id,
        InspectionTime: mission.InspectionTime,
      },
    });

    // Schedule mission inspection at mission.inspectionTime
    const inspectionTime = new Date(nodeSchedule.InspectionTime);
    const job = schedule.scheduleJob(inspectionTime, async () => {
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

      job.cancel();

      // Delete the NodeSchedule from DB

      await prisma.nodeSchedule.delete({
        where: {
          id: nodeSchedule.id,
        },
      });
    });

    return NextResponse.json({
      msg: `Inspection scheduled for mission ${mission.name}`,
    });
  } catch (error) {
    console.error("Error creating inspection:", error);
    return NextResponse.json({ error: "Something went wrong" });
  }
};
