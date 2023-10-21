import NextAuth, { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
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
            image: true,
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
          return user; // this return value is passed to the signIn property of the callbacks
        }

        return null;
      },
    }),
  ],
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    //newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // NB for signin by credential profile and email are undefined.
      console.log("callback", {
        user,
        account,
        profile,
        email,
        credentials,
      });

      if (account?.type === "credentials" || account?.type === "email") {
        return true;
      }

      if (account?.type === "oauth") {
        user.email_verified = user.email_verified || !!user.emailVerified;
        if (!user.email_verified) {
          return "/auth/error?error=unverified-email-address";
        }
        let existUser = await prisma.user.findFirst({
          where: {
            email: {
              equals: user.email,
              mode: "insensitive",
            },
          },
          include: {
            accounts: {
              where: {
                provider: account.provider,
              },
            },
          },
        });

        if (existUser) {
          if (existUser.email === user.email) {
            // check if user is not link to account and update accordingly if not

            if (!existUser.accounts.length) {
              try {
                const accountPayload = { ...account, userId: existUser.id };
                await prisma.account.create({
                  data: accountPayload,
                });
              } catch (ex) {
                console.log("Unable to link account");
              }
            }
          }

          // user created account with email/password
          if (
            existUser.identityProvider === IdentityProvider.RAVE &&
            account.provider === IdentityProvider.GOOGLE
          ) {
            await prisma.user.update({
              where: {
                email: user.email,
              },
              data: {
                password: null,
                email: user.email,
                identityProvider: IdentityProvider.GOOGLE,
                identityProviderId: account.providerAccountId,
              },
            });

            return true;
          } else if (existUser.identityProvider === IdentityProvider.RAVE) {
            return "/auth/error?error=login-with-email-password";
          }
        }

        const newUser = await prisma.user.create({
          data: {
            email: user.id,
            emailVerified: new Date(Date.now()),
            image: user.image,
            verified: user.email_verified,
            identityProvider: IdentityProvider.GOOGLE,
            identityProviderId: account.providerAccountId,
          },
        });
        //link account
        const accountPayload = { ...account, userId: newUser.id };
        await prisma.account.create({ data: accountPayload });

        return true;
      }
      return false;
    },

    async session({ session, token }) {
      console.log("session=>dddd", { session, token });

      const raveSession: Session = {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          role: token.role,
        },
      };

      return raveSession;
    },

    async jwt({ token, account, profile, trigger, session, user }) {
      if (trigger === "update") {
        console.log("uppppp", trigger);
        return {
          ...token,
          email: session?.email ?? token.email,
          id: token.id,
          role: session.role,
        };
      }

      /**
       * Use an if branch to check for the existence of parameters (apart from token). If they exist,
       *  this means that the callback is being invoked for the first time (i.e. the user is being signed in).
       *
       */
      console.log("jwt=>", { token, user, account, profile, trigger, session });

      if (!user) {
        const foundUser = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
          select: {
            id: true,
            email: true,
            emailVerified: true,
            identityProvider: true,
            image: true,
            identityProviderId: true,
            role: true,
          },
        });

        if (!foundUser) {
          return token;
        }

        return { ...token, ...foundUser };
      }

      if (!account) {
        return token;
      }

      if (account.type === "credentials") {
        // this will execute only if user signin
        return {
          ...token,
          id: user.id,
          role: user.role,
          email: user.email,
          image: user.image,
          identityProvider: user.identityProvider,
        };
      }

      if (account.type === "oauth") {
        if (!account.provider || !account.providerAccountId) {
          return token;
        }

        const existingUser = await prisma.user.findFirst({
          where: {
            AND: [
              { identityProvider: IdentityProvider.GOOGLE },
              { identityProviderId: account.providerAccountId },
            ],
          },
        });

        if (!existingUser) {
          const foundUser = await prisma.user.findUnique({
            where: {
              email: token.email,
            },
            select: {
              id: true,
              email: true,
              emailVerified: true,
              identityProvider: true,
              image: true,
              identityProviderId: true,
              role: true,
            },
          });

          if (!foundUser) {
            return token;
          }

          return { ...token, ...foundUser };
        }

        console.log("token oauth =>", token);

        return {
          ...token,
          id: existingUser.id,
          email: existingUser.email,
          role: existingUser.role,
        };
      }

      return token;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same domain
      else if (
        new URL(url).hostname ===
        new URL(process.env.WEBAPP_URL as string).hostname
      )
        return url;
      return baseUrl;
    },
  },
};

export default NextAuth(nextAuthOption);
