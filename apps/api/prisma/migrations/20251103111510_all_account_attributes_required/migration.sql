/*
  Warnings:

  - Made the column `account_name` on table `accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `account_type` on table `accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_balance` on table `accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_income` on table `accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_expense` on table `accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "account_name" SET NOT NULL,
ALTER COLUMN "account_type" SET NOT NULL,
ALTER COLUMN "total_balance" SET NOT NULL,
ALTER COLUMN "total_income" SET NOT NULL,
ALTER COLUMN "total_expense" SET NOT NULL;
