import { getUserFromClerkId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const user = await getUserFromClerkId();
    const mission = await prisma.mission.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(mission);
  } catch (error) {
    console.error("Can't get Mission:", error);
    return NextResponse.json({ msg: "Something went wrong!" });
  }
};
