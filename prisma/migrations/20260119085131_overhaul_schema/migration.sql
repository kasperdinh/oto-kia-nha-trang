/*
  Warnings:

  - You are about to drop the column `engine` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `promotionPrice` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `seats` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `carId` on the `CarSpec` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[variantId]` on the table `CarSpec` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variantId` to the `CarSpec` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CarSpec" DROP CONSTRAINT "CarSpec_carId_fkey";

-- DropIndex
DROP INDEX "CarSpec_carId_key";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "engine",
DROP COLUMN "imageUrl",
DROP COLUMN "price",
DROP COLUMN "promotionPrice",
DROP COLUMN "seats",
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "brand" SET DEFAULT 'Kia';

-- AlterTable
ALTER TABLE "CarImage" ADD COLUMN     "carColorId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "carId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CarSpec" DROP COLUMN "carId",
ADD COLUMN     "groundClearance" INTEGER,
ADD COLUMN     "variantId" TEXT NOT NULL,
ALTER COLUMN "features" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ColorMaster" (
    "id" TEXT NOT NULL,
    "nameVI" TEXT NOT NULL,
    "nameEN" TEXT,
    "code" TEXT NOT NULL,
    "hexCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ColorMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarVariant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "promotionPrice" DOUBLE PRECISION,
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarColor" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "colorMasterId" TEXT NOT NULL,

    CONSTRAINT "CarColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarDocument" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ColorMaster_code_key" ON "ColorMaster"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CarColor_variantId_colorMasterId_key" ON "CarColor"("variantId", "colorMasterId");

-- CreateIndex
CREATE UNIQUE INDEX "CarSpec_variantId_key" ON "CarSpec"("variantId");

-- AddForeignKey
ALTER TABLE "CarVariant" ADD CONSTRAINT "CarVariant_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarColor" ADD CONSTRAINT "CarColor_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarColor" ADD CONSTRAINT "CarColor_colorMasterId_fkey" FOREIGN KEY ("colorMasterId") REFERENCES "ColorMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarImage" ADD CONSTRAINT "CarImage_carColorId_fkey" FOREIGN KEY ("carColorId") REFERENCES "CarColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarDocument" ADD CONSTRAINT "CarDocument_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarSpec" ADD CONSTRAINT "CarSpec_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "CarVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
