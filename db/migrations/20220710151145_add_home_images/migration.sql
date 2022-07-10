-- CreateTable
CREATE TABLE "HomeImage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "cloudinaryId" TEXT NOT NULL,

    CONSTRAINT "HomeImage_pkey" PRIMARY KEY ("id")
);
