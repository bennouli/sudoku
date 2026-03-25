"use server";

import { Game, Sudoku } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";

export async function createGame(playerId: Game["playerId"], sudoku: Sudoku) {
  return await prisma.game.create({
    data: {
      state: JSON.stringify(sudoku.puzzle),
      playerId,
      sudokuId: sudoku.id,
    },
  });
}

export async function getGame(id: string) {
  return await prisma.game.findFirst({ where: { id } });
}

export async function getGames({
  offset = 0,
  limit = 25,
}: {
  offset?: number;
  limit?: number;
}) {
  return await prisma.game.findMany({
    skip: offset,
    take: limit,
  });
}
