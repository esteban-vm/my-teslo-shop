/*
  Warnings:

  - You are about to drop the column `impersonated_by` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `ban_expires` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `ban_reason` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `banned` on the `users` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "user_roles" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "impersonated_by";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "ban_expires",
DROP COLUMN "ban_reason",
DROP COLUMN "banned",
DROP COLUMN "role",
ADD COLUMN     "role" "user_roles" DEFAULT 'user';
