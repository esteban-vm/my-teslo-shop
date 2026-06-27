-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "is_paid" DROP NOT NULL,
ALTER COLUMN "is_paid" SET DEFAULT false;
