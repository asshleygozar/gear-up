/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "name" VARCHAR(255),
ADD COLUMN     "user_account_date_created" TIMESTAMP(6),
ADD COLUMN     "user_id" SERIAL NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "public"."accounts" (
    "account_id" SERIAL NOT NULL,
    "account_name" VARCHAR(255),
    "account_type" VARCHAR(255),
    "total_balance" DECIMAL(10,2),
    "total_income" DECIMAL(10,2),
    "total_expense" DECIMAL(10,2),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "public"."transaction_table" (
    "transaction_id" SERIAL NOT NULL,
    "transaction_category" VARCHAR(255),
    "transaction_amount" DECIMAL(10,2),
    "transaction_date" TIMESTAMP(6),
    "transaction_description" VARCHAR(255),
    "account_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "transaction_table_pkey" PRIMARY KEY ("transaction_id")
);

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."transaction_table" ADD CONSTRAINT "transaction_table_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."transaction_table" ADD CONSTRAINT "transaction_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
