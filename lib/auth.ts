import { auth } from "@clerk/nextjs";
import { prisma } from "./db";

export const getUserFromClerkId = async () => {
  const { userId } = await auth();

  const user = prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  });

  return user;
};
