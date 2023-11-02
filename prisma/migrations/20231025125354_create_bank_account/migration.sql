-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "bank_name" VARCHAR(100) NOT NULL,
    "bank_account_number" VARCHAR(100) NOT NULL,
    "balance" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bank_accounts_user_id_key" ON "bank_accounts"("user_id");

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
