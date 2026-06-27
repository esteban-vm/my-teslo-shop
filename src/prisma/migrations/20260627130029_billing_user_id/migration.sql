/*
  Warnings:

  - You are about to drop the column `userId` on the `billing_addresses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `billing_addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `billing_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "billing_addresses" DROP CONSTRAINT "billing_addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "shipping_addresses" DROP CONSTRAINT "shipping_addresses_order_id_fkey";

-- DropIndex
DROP INDEX "billing_addresses_userId_key";

-- AlterTable
ALTER TABLE "billing_addresses" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "billing_addresses_user_id_key" ON "billing_addresses"("user_id");

-- AddForeignKey
ALTER TABLE "billing_addresses" ADD CONSTRAINT "billing_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping_addresses" ADD CONSTRAINT "shipping_addresses_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
