/*
  Warnings:

  - You are about to drop the column `includeInShop` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "includeInShop",
DROP COLUMN "price";

-- CreateTable
CREATE TABLE "Shop" (
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "s3Path" TEXT NOT NULL,
    "coverImageKey" TEXT,
    "description" TEXT NOT NULL,
    "sizing" TEXT NOT NULL,
    "careInstructions" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "instagramURL" TEXT,
    "pinterestURL" TEXT,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("slug")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_slug_key" ON "Shop"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_title_key" ON "Shop"("title");
