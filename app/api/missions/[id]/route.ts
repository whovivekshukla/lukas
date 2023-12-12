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

    return NextResponse.json(mission);
  } catch (error) {
    console.error("Error creating mission:", error);
    return NextResponse.json({ msg: "Mission Not Found" });
  }
};

export const PATCH = async (request: Request, { params }) => {
  try {
    const user = await getUserFromClerkId();
    const missionData = await request.json();
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
    const user = await getUserFromClerkId();

    await prisma.mission.delete({
      where: {
        userId: user.id,
        id: params.id,
      },
    });

    return NextResponse.json({ msg: "Mission Deleted!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Problem in Deleting Mission" });
  }
};
