import { prisma } from "#lib/prisma.ts";

export async function cleanUpDatabase() {
    await prisma.users.deleteMany({});
    await prisma.transactions.deleteMany({});
}
