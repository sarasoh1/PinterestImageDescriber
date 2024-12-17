/*
  Warnings:

  - Made the column `coverImageKey` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coverImageKey` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "coverImageKey" SET NOT NULL;

-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "coverImageKey" SET NOT NULL;
