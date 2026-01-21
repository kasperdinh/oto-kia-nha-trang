/*
  Warnings:

  - You are about to drop the `CarSpec` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarSpec" DROP CONSTRAINT "CarSpec_variantId_fkey";

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "CarVariant" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "CarSpec";
