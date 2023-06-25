-- CreateTable
CREATE TABLE "Interest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_InterestToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_InterestToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Interest" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_InterestToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_InterestToUser_AB_unique" ON "_InterestToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_InterestToUser_B_index" ON "_InterestToUser"("B");
