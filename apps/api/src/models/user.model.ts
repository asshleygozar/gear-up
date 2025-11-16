import "dotenv/config.js";
import { prisma } from "#lib/prisma.js";
import type { UserType } from "#controllers/auth.controller.js";

export const UserModel = {
    findByEmail: async (email: string) =>
        await prisma.users.findUnique({
            where: {
                email,
            },
        }),
    create: async ({ data }: { data: UserType }) =>
        await prisma.users.create({
            data,
        }),
};
