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
