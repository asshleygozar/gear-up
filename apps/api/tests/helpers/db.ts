import { prisma } from "#/lib/prisma.js";

export async function cleanUpDatabase() {
    await prisma.users.deleteMany({});
    await prisma.transactions.deleteMany({});
}
