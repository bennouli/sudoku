"use server";

import { prisma } from "@/lib/db";

// USER
export async function getUser(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: { games: true },
  });
}
