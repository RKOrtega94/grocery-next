import { PrismaClient } from "@prisma/client";
import { Pagination } from "../interfaces/pagination.interface";


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

function buildPrismaPaginationOptions(pagination: Pagination) {
  return {
    skip: ((pagination.page ?? 1) - 1) * (pagination.limit ?? 10),
    take: pagination.limit,
    orderBy: {
      [pagination.sortBy ?? "id"]: pagination.sort ?? "asc",
    },
  };
}

export { prisma, buildPrismaPaginationOptions };
