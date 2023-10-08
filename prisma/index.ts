import type { Prisma } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

const prismaOption: Prisma.PrismaClientOptions = {};

if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
  prismaOption.log = ["query", "info", "warn", "error"];
}

const prisma = new PrismaClient(prismaOption);

export default prisma;
