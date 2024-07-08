import { auth } from "./auth";
import prisma from "./prisma";

export async function getUserInfo() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.member.findFirst({
    where: {
      email: session.user.email,
    },
  });

  return user;
}
