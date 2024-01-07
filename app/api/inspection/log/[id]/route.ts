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

    if (!mission) {
      return NextResponse.json({ message: "Mission not found" });
    }
    const log = await prisma.inspectionLog.findFirst({
      where: {
        missionId: params.id,
        mission: {
          userId: user.id,
        },
      },
    });

    if (!log) {
      return NextResponse.json({ message: "No log found" });
    }

    return NextResponse.json({ log });
  } catch (error) {
    NextResponse.json({ message: "Error fetching log" });
  }
};
