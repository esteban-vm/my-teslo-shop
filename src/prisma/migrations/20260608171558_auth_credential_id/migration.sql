/*
  Warnings:

  - The primary key for the `authenticators` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `credentialID` on the `authenticators` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[credential_id]` on the table `authenticators` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `credential_id` to the `authenticators` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "authenticators_credentialID_key";

-- AlterTable
ALTER TABLE "authenticators" DROP CONSTRAINT "authenticators_pkey",
DROP COLUMN "credentialID",
ADD COLUMN     "credential_id" TEXT NOT NULL,
ADD CONSTRAINT "authenticators_pkey" PRIMARY KEY ("user_id", "credential_id");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "active" BOOLEAN DEFAULT true,
ADD COLUMN     "password" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "authenticators_credential_id_key" ON "authenticators"("credential_id");
