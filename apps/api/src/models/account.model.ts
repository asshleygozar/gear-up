import { CreateAccountType } from "#lib/account-schema.js";
import { prisma } from "#lib/prisma.js";

export const AccountModel = {
    getAllAccounts: async (userId: number) => {
        return await prisma.accounts.findMany({
            where: {
                user_id: userId,
            },
        });
    },
    createAccount: async ({ userId, data }: { userId: number; data: CreateAccountType }) => {
        return await prisma.accounts.create({
            data: {
                ...data,
                user_id: userId,
            },
        });
    },
};
