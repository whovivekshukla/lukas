import schedule from "node-schedule";
import { getUserFromClerkId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { Status } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { MissionValidation } from "@/lib/validation";

export const GET = async (request: Request, { params }) => {
  try {
    const user = await getUserFromClerkId();

    const mission = await prisma.mission.findUnique({
      where: {
        userId: user.id,
        id: params.id,
      },
    });

    if (!mission) return NextResponse.json({ err: "Mission Not Found" });
    return NextResponse.json(mission);
  } catch (error) {
    console.error("Error creating mission:", error);
    return NextResponse.json({ msg: "Mission Not Found" });
  }
};

export const PATCH = async (request: Request, { params }) => {
  try {
    const user = await getUserFromClerkId();

    const mission = await prisma.mission.findUnique({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!mission) return NextResponse.json({ msg: "Mission Not Found" });

    if (
      mission.status === Status.InProgress ||
      mission.status === Status.Completed
    ) {
      return NextResponse.json({
        err: "Can't Update, Mission is either in progress or completed!",
      });
    }

    const missionDataJSON = await request.json();
    const missionData = MissionValidation.parse(missionDataJSON);
    const updatedMission = await prisma.mission.update({
      where: {
        userId: user.id,
        id: params.id,
      },
      data: {
        userId: user.id,
        ...missionData,
      },
    });

    return NextResponse.json(updatedMission);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Error Updating Mission" });
  }
};

export const DELETE = async (request: Request, { params }) => {
  try {
    const userId = auth();
    const user = await prisma.user.findFirst({
      where: { clerkId: userId.userId },
    });

    if (!user) return NextResponse.json({ msg: "User Not Found" });

    const mission = await prisma.mission.findUnique({
      where: { id: params.id, userId: user.id },
    });

    if (!mission) return NextResponse.json({ msg: "Mission Not Found" });

    const deletedMission = await prisma.mission.delete({
      where: { userId: user.id, id: mission.id },
    });

    return NextResponse.json({ msg: "Mission Deleted!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Something went wrong!" });
  }
};
