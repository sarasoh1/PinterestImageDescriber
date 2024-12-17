-- CreateTable
CREATE TABLE "ImageDescription" (
    "slug" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "imgURLs" TEXT[],
    "shopSlug" TEXT,
    "postSlug" TEXT,

    CONSTRAINT "ImageDescription_pkey" PRIMARY KEY ("slug")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImageDescription_slug_key" ON "ImageDescription"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ImageDescription_shopSlug_key" ON "ImageDescription"("shopSlug");

-- CreateIndex
CREATE UNIQUE INDEX "ImageDescription_postSlug_key" ON "ImageDescription"("postSlug");
