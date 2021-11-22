-- CreateTable
CREATE TABLE "Tags" (
    "id" BIGSERIAL NOT NULL,
    "guild" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "content" VARCHAR(2000) NOT NULL,
    "uses" INTEGER NOT NULL DEFAULT 0,
    "updoots" INTEGER NOT NULL DEFAULT 0,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IAmRoles" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "guild" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "IAmRoles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE INDEX "Tags_id_idx" ON "Tags"("id");
