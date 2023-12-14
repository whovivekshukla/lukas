import { getUserFromClerkId } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const GET = async () => {
  try {
    const user = await getUserFromClerkId();
    const mission = await prisma.mission.findMany({
      where: {
        userId: user.id,
      },
    });

     return Response.json({ mission });
  } catch (error) {
    console.error("Can't get Mission:", error);
    return Response.json({ msg: "Something went wrong!" });
  }
};
