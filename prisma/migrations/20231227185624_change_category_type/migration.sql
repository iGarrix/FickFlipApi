/*
  Warnings:

  - Changed the type of `category` on the `Positions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PositionCategory" AS ENUM ('Clothes', 'Bags', 'Shoes', 'Accessories');

-- AlterTable
ALTER TABLE "Positions" DROP COLUMN "category",
ADD COLUMN     "category" "PositionCategory" NOT NULL;
