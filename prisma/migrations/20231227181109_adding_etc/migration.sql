-- CreateTable
CREATE TABLE "PhotosPosition" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "isUpload" BOOLEAN NOT NULL DEFAULT false,
    "positionsId" TEXT,

    CONSTRAINT "PhotosPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Positions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "shipping" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promocodes" (
    "id" TEXT NOT NULL,
    "promo" TEXT NOT NULL,
    "discoint" INTEGER NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "targetCategories" TEXT[],
    "tag" TEXT NOT NULL,

    CONSTRAINT "Promocodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Positions_code_key" ON "Positions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Promocodes_promo_key" ON "Promocodes"("promo");

-- AddForeignKey
ALTER TABLE "PhotosPosition" ADD CONSTRAINT "PhotosPosition_positionsId_fkey" FOREIGN KEY ("positionsId") REFERENCES "Positions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
