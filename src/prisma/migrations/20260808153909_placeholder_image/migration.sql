/*
  Warnings:

  - Made the column `url` on table `pictures` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pictures" ALTER COLUMN "url" SET NOT NULL;
