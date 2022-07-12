/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `Trustee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `Trustee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trustee" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trustee_order_key" ON "Trustee"("order");
