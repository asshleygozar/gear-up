import { prisma } from "#lib/prisma.js";

export const AccountModel = {
    getAllAccounts: async (userId: number) => {
        return await prisma.accounts.findMany({
            where: {
                user_id: userId,
            },
        });
    },
};
