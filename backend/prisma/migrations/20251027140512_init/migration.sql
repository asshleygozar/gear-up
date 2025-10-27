-- CreateTable
CREATE TABLE "accounts" (
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
CREATE TABLE "transactions" (
    "transaction_id" SERIAL NOT NULL,
    "transaction_category" VARCHAR(255),
    "transaction_amount" DECIMAL(10,2),
    "transaction_date" TIMESTAMP(6),
    "transaction_description" VARCHAR(255),
    "account_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "users" (
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "username" VARCHAR(255),
    "user_account_date_created" TIMESTAMP(6),
    "user_id" SERIAL NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
