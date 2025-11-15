import "dotenv/config.js";
import { prisma } from "#lib/prisma.js";
import type { SignUpValidation } from "#lib/auth.js";

export const UserModel = {
    findByEmail: async (email: string) =>
        await prisma.users.findUnique({
            where: {
                email,
            },
        }),
    create: async ({ data }: { data: SignUpValidation }) =>
        await prisma.users.create({
            data,
        }),
};
