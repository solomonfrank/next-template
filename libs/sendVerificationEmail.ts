import { sendEmail } from "@/emails/resend";
import { VerifyEmailTemplate } from "@/emails/templates/verifyEmail";
import prisma from "@/prisma";
import { randomBytes } from "crypto";

export const sendVerificationEmail = async (email: string) => {
  const token = randomBytes(32).toString("hex");

  await prisma.verificationToken.create({
    data: {
      token,
      expires: new Date(Date.now() + 24 * 3600 * 1000), // 1day
      identifier: email,
    },
  });

  const verificationLink = `${process.env.RAVE_BASE_URl}/auth/verify?token=${token}`;

  const response = await sendEmail({
    to: email,
    subject: "Account creation",
    react: VerifyEmailTemplate({ url: verificationLink, email }),
    from: "rock@noreply-rave.com",
  });

  console.log("mail response", response);
};
