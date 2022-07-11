/*
  Warnings:

  - Added the required column `fileType` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('COVENANTS', 'MEETING_MINUTES');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "fileType" "FileType" NOT NULL;
