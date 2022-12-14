-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "listPrice" INTEGER NOT NULL,
    "salePrice" INTEGER NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "productImage" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
