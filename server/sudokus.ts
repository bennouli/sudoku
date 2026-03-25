"use server";

import { prisma } from "@/lib/db";

export async function getSudokus({
  offset = 0,
  limit = 25,
}: {
  offset?: number;
  limit?: number;
}) {
  return await prisma.sudoku.findMany({
    skip: offset,
    take: limit,
  });
}

export async function getSudoku(id: string) {
  return await prisma.sudoku.findFirst({ where: { id } });
}
