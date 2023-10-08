import prisma from "@/prisma";

export const validateEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
    },
  });

  if (user) {
    return true;
  }

  return false;
};
