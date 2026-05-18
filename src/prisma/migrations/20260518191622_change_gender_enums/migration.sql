/*
  Warnings:

  - The values [men,women,kids,unisex] on the enum `genders` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - Changed the type of `name` on the `categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "category_names" AS ENUM ('T-Shirts', 'Pants', 'Hoodies', 'Hats');

-- AlterEnum
BEGIN;
CREATE TYPE "genders_new" AS ENUM ('Men', 'Women', 'Kids', 'Unisex');
ALTER TABLE "products" ALTER COLUMN "gender" TYPE "genders_new" USING ("gender"::text::"genders_new");
ALTER TYPE "genders" RENAME TO "genders_old";
ALTER TYPE "genders_new" RENAME TO "genders";
DROP TYPE "public"."genders_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "name",
ADD COLUMN     "name" "category_names" NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
