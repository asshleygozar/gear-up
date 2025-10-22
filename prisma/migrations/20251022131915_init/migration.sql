/*
  Warnings:

  - You are about to drop the `transaction_table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."transaction_table" DROP CONSTRAINT "transaction_table_account_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."transaction_table" DROP CONSTRAINT "transaction_table_user_id_fkey";

-- DropTable
DROP TABLE "public"."transaction_table";

-- CreateTable
CREATE TABLE "public"."transactions" (
    "transaction_id" SERIAL NOT NULL,
    "transaction_category" VARCHAR(255),
    "transaction_amount" DECIMAL(10,2),
    "transaction_date" TIMESTAMP(6),
    "transaction_description" VARCHAR(255),
    "account_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
