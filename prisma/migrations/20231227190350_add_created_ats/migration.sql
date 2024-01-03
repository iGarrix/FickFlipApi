/*
  Warnings:

  - You are about to drop the column `modifyAt` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `modifyAt` on the `Positions` table. All the data in the column will be lost.
  - You are about to drop the column `modifyAt` on the `Promocodes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "modifyAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Positions" DROP COLUMN "modifyAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Promocodes" DROP COLUMN "modifyAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
