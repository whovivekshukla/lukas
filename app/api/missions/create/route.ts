import { getUserFromClerkId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const user = await getUserFromClerkId();
    const missionData = await request.json();
    
    const mission = await prisma.mission.create({
      data: {
        userId: user.id,
        ...missionData,
      },
    });

    return NextResponse.json(mission);
  } catch (error) {
    console.error("Error creating mission:", error);
    return NextResponse.json({ msg: "Error creating mission" });
  }
};
