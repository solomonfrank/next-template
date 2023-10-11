import { hashPassword } from "@/libs/hashPassword";
import { sendVerificationEmail } from "@/libs/sendVerificationEmail";
import { validateEmail } from "@/libs/validateEmail";
import prisma from "@/prisma";
import { IdentityProvider } from "@/prisma/types/enum";
import { signupSchema } from "@/utils/schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  const { password, email } = signupSchema.parse(body);

  if (!email) {
    return res.status(422).json({ message: "Email is required" });
  }

  const emailExist = await validateEmail(email);

  if (emailExist) {
    return res.status(409).json({ message: "Email already exist" });
  }

  const hashedPassword = await hashPassword(password);

  const createdUser = await prisma.user.upsert({
    where: { email },
    update: {
      email,
      emailVerified: new Date(Date.now()),
      password: hashedPassword,
      identityProvider: IdentityProvider.RAVE,
    },
    create: {
      email,
      emailVerified: new Date(Date.now()),
      password: hashedPassword,
      identityProvider: IdentityProvider.RAVE,
    },
  });
  console.log("createdUser", createdUser);

  if (process.env.NODE_ENV === "production") {
    await sendVerificationEmail(email);
  }

  return res.status(201).json({ message: "User created successfully" });
}
