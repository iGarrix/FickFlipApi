/*
  Warnings:

  - You are about to drop the column `targetCategories` on the `Promocodes` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Success', 'Failed', 'Waiting');

-- AlterTable
ALTER TABLE "Promocodes" DROP COLUMN "targetCategories";

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "payment" TEXT NOT NULL,
    "promocodesId" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_promocodesId_fkey" FOREIGN KEY ("promocodesId") REFERENCES "Promocodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_id_fkey" FOREIGN KEY ("id") REFERENCES "Positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
