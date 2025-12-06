/*
  Warnings:

  - You are about to drop the column `google_id` on the `users` table. All the data in the column will be lost.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "google_id",
ALTER COLUMN "password" SET NOT NULL;
