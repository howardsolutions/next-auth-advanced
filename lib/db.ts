import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// If not on PRODUCTION MODE, hot-reload on Next.js could potentially create many prisma client instance
// Therefore, to make sure we only have One instance on dev / staging / preprod... we embeded prisma client instance to globalThis
// because globalThis will not be affect by hot-reload