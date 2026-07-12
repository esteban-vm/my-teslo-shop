-- DropForeignKey
ALTER TABLE "pictures" DROP CONSTRAINT "pictures_productId_fkey";

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
