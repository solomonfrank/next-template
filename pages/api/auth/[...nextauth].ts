import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
      authorize(credentials, req) {
        const user = { id: "1" };
        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(nextAuthOption);
