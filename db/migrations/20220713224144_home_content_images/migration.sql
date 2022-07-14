/*
  Warnings:

  - You are about to drop the column `fileId` on the `HomeContent` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `HomeContent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HomeContent" DROP CONSTRAINT "HomeContent_fileId_fkey";

-- AlterTable
ALTER TABLE "HomeContent" DROP COLUMN "fileId",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "accessKey" TEXT,
ALTER COLUMN "cloudinaryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "HomeContent" ADD CONSTRAINT "HomeContent_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
