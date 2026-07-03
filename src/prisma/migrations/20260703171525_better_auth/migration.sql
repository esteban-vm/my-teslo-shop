/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `access_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `id_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider_account_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token_in` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `expires` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `session_token` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `authenticators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailVerified` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "authenticators" DROP CONSTRAINT "authenticators_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropIndex
DROP INDEX "sessions_session_token_key";

-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
DROP COLUMN "access_token",
DROP COLUMN "created_at",
DROP COLUMN "expires_at",
DROP COLUMN "id_token",
DROP COLUMN "provider",
DROP COLUMN "provider_account_id",
DROP COLUMN "refresh_token",
DROP COLUMN "refresh_token_in",
DROP COLUMN "session_state",
DROP COLUMN "token_type",
DROP COLUMN "type",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "accessTokenExpiresAt" TIMESTAMPTZ(3),
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "idToken" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "providerId" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "refreshTokenExpiresAt" TIMESTAMPTZ(3),
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "created_at",
DROP COLUMN "expires",
DROP COLUMN "session_token",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "userAgent" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "active",
DROP COLUMN "created_at",
DROP COLUMN "email_verified",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(3) NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "authenticators";

-- DropTable
DROP TABLE "verification_tokens";

-- CreateTable
CREATE TABLE "verifications" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
