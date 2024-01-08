import { performInspection } from "@/lib/api";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";


export const GET = async (request: Request, { params }) => {
  try {
    const mission = await prisma.mission.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!mission) {
      return NextResponse.json({ msg: "Mission Not Found" });
    }

    const checkInspectionLog = await prisma.inspectionLog.findFirst({
      where: {
        missionId: mission.id,
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

    return NextResponse.json({
      msg: `Inspection scheduled for ${mission.name}`,
    });
  } catch (error) {
    console.error("Error creating inspection:", error);
    return NextResponse.json({ error: "Something went wrong" });
  }
};
