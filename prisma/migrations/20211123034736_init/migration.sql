-- CreateTable
CREATE TABLE "Tag" (
    "id" BIGSERIAL NOT NULL,
    "guild" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "content" VARCHAR(2000) NOT NULL,
    "uses" INTEGER NOT NULL DEFAULT 0,
    "updoots" INTEGER NOT NULL DEFAULT 0,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IAmRole" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "guild" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "IAmRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Tag_id_idx" ON "Tag"("id");
