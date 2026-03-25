/*
  Warnings:

  - Added the required column `sudokuId` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "sudokuId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_sudokuId_fkey" FOREIGN KEY ("sudokuId") REFERENCES "sudokus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
