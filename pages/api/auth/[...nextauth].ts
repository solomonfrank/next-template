import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma";
import { IdentityProvider } from "@/prisma/types/enum";
import { verifyPassword } from "@/libs/hashPassword";

export const nextAuthOption: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Enter email address",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Something went wrong");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            email: true,
            emailVerified: true,
            id: true,
            identityProvider: true,
            role: true,
            password: true,
          },
        });

        console.log("ouns", user);
        if (!user) {
          throw new Error("Invalid credentials");
        }

        if (user.identityProvider !== IdentityProvider.RAVE) {
          throw new Error("You need to login from a third party");
        }

        if (!user.password) {
          throw new Error("Invalid credentials");
        }

        const isValidPassword = await verifyPassword(
          user.password,
          credentials.password
        );
        console.log("issValis", isValidPassword);

        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }
        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(nextAuthOption);
