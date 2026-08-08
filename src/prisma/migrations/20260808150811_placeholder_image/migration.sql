-- AlterTable
ALTER TABLE "pictures" ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "url" SET DEFAULT 'imgs/placeholder.jpg';
