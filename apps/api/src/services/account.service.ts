import GeneralError from "#errors/general-error.js";
import { DeleteAccountType } from "#lib/account-schema.js";
import { prisma } from "#lib/prisma.js";

export const deleteAccountAndTransactions = async ({ data }: { data: DeleteAccountType }) => {
    try {
        const result = await prisma.$transaction(async (tx) => {
            const [deletedAccount, _] = await Promise.all([
                await tx.accounts.delete({
                    where: {
                        account_id: data.account_id,
                    },
                }),
                await tx.transactions.deleteMany({
                    where: {
                        account_id: data.account_id,
                    },
                }),
            ]);

            return deletedAccount;
        });

        return result;
    } catch (error) {
        if (error) {
            throw new GeneralError("Service error", "Failed to delete account and transactions", 500);
        }
    }
};
