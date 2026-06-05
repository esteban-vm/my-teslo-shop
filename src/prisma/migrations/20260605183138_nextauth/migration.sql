/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `providerAccountId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `accounts` table. All the data in the column will be lost.
  - The primary key for the `authenticators` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `credentialBackedUp` on the `authenticators` table. All the data in the column will be lost.
  - You are about to drop the column `credentialDeviceType` on the `authenticators` table. All the data in the column will be lost.
  - You are about to drop the column `credentialPublicKey` on the `authenticators` table. All the data in the column will be lost.
  - You are about to drop the column `providerAccountId` on the `authenticators` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `authenticators` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[session_token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider_account_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credential_backed_up` to the `authenticators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credential_device_type` to the `authenticators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credential_public_key` to the `authenticators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_account_id` to the `authenticators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `authenticators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_token` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "authenticators" DROP CONSTRAINT "authenticators_userId_fkey";

-- DropIndex
DROP INDEX "sessions_sessionToken_key";

-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "providerAccountId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "provider_account_id" TEXT NOT NULL,
ADD COLUMN     "refresh_token_in" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("provider", "provider_account_id");

-- AlterTable
ALTER TABLE "authenticators" DROP CONSTRAINT "authenticators_pkey",
DROP COLUMN "credentialBackedUp",
DROP COLUMN "credentialDeviceType",
DROP COLUMN "credentialPublicKey",
DROP COLUMN "providerAccountId",
DROP COLUMN "userId",
ADD COLUMN     "credential_backed_up" BOOLEAN NOT NULL,
ADD COLUMN     "credential_device_type" TEXT NOT NULL,
ADD COLUMN     "credential_public_key" TEXT NOT NULL,
ADD COLUMN     "provider_account_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "authenticators_pkey" PRIMARY KEY ("user_id", "credentialID");

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "createdAt",
DROP COLUMN "sessionToken",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "session_token" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "emailVerified",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email_verified" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authenticators" ADD CONSTRAINT "authenticators_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
