-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TOBEDELIVERED', 'DELIVERED', 'DELAYED');

-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "orderNumber" INTEGER NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "customer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "chassi" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'TOBEDELIVERED',

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);
