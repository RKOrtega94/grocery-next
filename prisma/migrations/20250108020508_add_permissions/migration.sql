-- CreateEnum
CREATE TYPE "entity" AS ENUM ('USER', 'ROLE');

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'INACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entity_permissions" (
    "entity" "entity" NOT NULL,
    "entityId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "entity_permissions_pkey" PRIMARY KEY ("entity","entityId","permissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- AddForeignKey
ALTER TABLE "entity_permissions" ADD CONSTRAINT "entity_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
