/*
  Warnings:

  - The values [Unisex] on the enum `genders` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "genders_new" AS ENUM ('Men', 'Women', 'Kids');
ALTER TABLE "products" ALTER COLUMN "gender" TYPE "genders_new" USING ("gender"::text::"genders_new");
ALTER TYPE "genders" RENAME TO "genders_old";
ALTER TYPE "genders_new" RENAME TO "genders";
DROP TYPE "public"."genders_old";
COMMIT;
