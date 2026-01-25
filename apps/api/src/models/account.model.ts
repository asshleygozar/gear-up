import { CreateAccountType, DeleteAccountType as UpdateAccountType } from "#lib/account-schema.js";
import { prisma } from "#lib/prisma.js";

export const AccountModel = {
    getAllAccounts: async (userId: number) => {
        return await prisma.accounts.findMany({
            where: {
                userId: userId,
            },
        });
    },
    createAccount: async ({ userId, data }: { userId: number; data: CreateAccountType }) => {
        return await prisma.accounts.create({
            data: {
                ...data,
                userId: userId,
            },
        });
    },
    updateAccount: async ({ userId, data }: { userId: number; data: UpdateAccountType }) => {
        return await prisma.accounts.update({
            where: {
                userId: userId,
                accountId: data.accountId,
            },
            data,
        });
    },
};
