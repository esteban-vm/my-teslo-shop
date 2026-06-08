-- CreateEnum
CREATE TYPE "user_roles" AS ENUM ('client', 'admin');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "user_roles" DEFAULT 'client';
