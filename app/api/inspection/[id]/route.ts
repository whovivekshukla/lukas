import { performInspection } from "@/lib/api";
import { getUserFromClerkId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

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

    console.log("checking for previous inspection...");

    const checkInspectionLog = await prisma.inspectionLog.findFirst({
      where: {
        missionId: mission.id,
        mission: {
          userId: user.id,
        },
      },
    });

    if (checkInspectionLog) {
      return NextResponse.json(checkInspectionLog);
    }

    console.log("no previous inspection found...");
    console.log("performing inspection...");

    const inspection = await performInspection(mission.waypoints);
    console.log("inspection finished");
    const inspectionLog = await prisma.inspectionLog.create({
      data: {
        missionId: mission.id,
        data: inspection,
      },
    });

    console.log("inspection log created");

    return NextResponse.json(inspectionLog);
  } catch (error) {
    console.error("Error creating inspection:", error);
    return NextResponse.json({ msg: "Inspection Not Found" });
  }
};
