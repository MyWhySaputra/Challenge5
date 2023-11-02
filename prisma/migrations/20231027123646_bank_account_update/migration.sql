/*
  Warnings:

  - You are about to drop the `bank_accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bank_accounts" DROP CONSTRAINT "bank_accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_destination_account_id_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_source_account_id_fkey";

-- DropTable
DROP TABLE "bank_accounts";

-- CreateTable
CREATE TABLE "bankAccounts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "bank_name" VARCHAR(100) NOT NULL,
    "bank_account_number" INTEGER NOT NULL,
    "balance" BIGINT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "bankAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bankAccounts_user_id_key" ON "bankAccounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "bankAccounts_bank_account_number_key" ON "bankAccounts"("bank_account_number");

-- AddForeignKey
ALTER TABLE "bankAccounts" ADD CONSTRAINT "bankAccounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_source_account_id_fkey" FOREIGN KEY ("source_account_id") REFERENCES "bankAccounts"("bank_account_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_destination_account_id_fkey" FOREIGN KEY ("destination_account_id") REFERENCES "bankAccounts"("bank_account_number") ON DELETE RESTRICT ON UPDATE CASCADE;
