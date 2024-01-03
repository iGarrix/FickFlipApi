-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "modifyAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PhotosPosition" ADD COLUMN     "modifyAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Positions" ADD COLUMN     "modifyAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Promocodes" ADD COLUMN     "modifyAt" TIMESTAMP(3);
