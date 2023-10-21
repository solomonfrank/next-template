import type { User as PrismaUser } from "@prisma/client";
import type { DefaultUser, Profile as DefaultProfile } from "next-auth";

declare module "next-auth" {
  interface User extends Omit<DefaultUser, "id"> {
    id: PrismaUser["id"];
    emailVerified?: PrismaUser["emailVerified"];
    email_verified?: boolean;
    email: PrismaUser["email"];
    role: PrismaUser["role"];
    identityProvider?: PrismaUser["identityProvider"];
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    username?: string | null;
    email: string;
    role?: Role;
    identityProvider?: IdentityProvider;
    firstName?: string; // add firstName to the jwt object
  }
}
