-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_promocodesId_fkey";

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "promocodesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_promocodesId_fkey" FOREIGN KEY ("promocodesId") REFERENCES "Promocodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
