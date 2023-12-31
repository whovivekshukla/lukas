import { performInspection } from "@/lib/api";
import { getUserFromClerkId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }) => {
  try {
    const user = await getUserFromClerkId();
    const mission = await prisma.mission.findMany({
      where: {
        userId: user.id,
        status: "pending",
      },
    });

    console.log(mission);

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

    await prisma.mission.update({
      data: {
        status: "inprogress",
      },
      where: {
        id: mission.id,
      },
    });

    const resArray = [];
    const result = await performInspection(mission.waypoints, async (log) => {
      console.log(log); // Log each step of the inspection process
      resArray.push(log);
    });

    await prisma.inspectionLog.create({
      data: {
        missionId: mission.id,
        data: resArray,
      },
    });
    console.log("inspection finished");

    await prisma.mission.update({
      data: {
        status: "completed",
      },
      where: {
        id: mission.id,
      },
    });

    console.log("inspection log created");

    return NextResponse.json(resArray);
  } catch (error) {
    console.error("Error creating inspection:", error);
    return NextResponse.json({ msg: "Inspection Not Found" });
  }
};
