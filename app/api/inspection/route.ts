import { getUserFromClerkId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  const user = await getUserFromClerkId();

  const mission = await prisma.mission.findMany({
    where: {
      user: {
        id: user.id,
      },
      status: "completed",
    },
    orderBy: {
      InspectionTime: "desc",
    },
  });

  if (!mission)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );

  if (mission.length === 0) {
    return NextResponse.json({ message: "No mission found" }, { status: 404 });
  }

  return NextResponse.json({ mission }, { status: 200 });
};
