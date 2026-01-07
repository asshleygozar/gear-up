-- CreateEnum
CREATE TYPE "transac_type" AS ENUM ('income', 'expense', 'transfer');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "account_id_receiver" INTEGER,
ADD COLUMN     "transaction_type" "transac_type";

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "fk_account_receiver" FOREIGN KEY ("account_id_receiver") REFERENCES "accounts"("account_id") ON DELETE CASCADE ON UPDATE NO ACTION;
