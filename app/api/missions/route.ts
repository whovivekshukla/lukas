import { getUserFromClerkId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await getUserFromClerkId();
  const missions = await prisma.mission.findMany({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json(missions );
};
