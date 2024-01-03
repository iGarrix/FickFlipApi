/*
  Warnings:

  - You are about to drop the column `image` on the `Positions` table. All the data in the column will be lost.
  - Added the required column `size` to the `Positions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Positions" DROP COLUMN "image",
ADD COLUMN     "size" TEXT NOT NULL;
