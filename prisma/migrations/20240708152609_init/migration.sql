-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "serial" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Member_serial_email_idx" ON "Member"("serial", "email");
