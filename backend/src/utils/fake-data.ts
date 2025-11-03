import { users } from "@prisma/client";
import { hashedPassword } from "#lib/encrypt-password.ts";
import { faker } from "@faker-js/faker";

const USER_DATA_LENGTH = 20;


// Fake user data
export async function generateFakeUsers(): Promise<users[]> {
    const items = Array.from({ length: USER_DATA_LENGTH });
    const users = await Promise.all(
        items.map(async () => {
            const encryptedPassword = await hashedPassword(faker.internet.password());
            return {
                email: faker.internet.email(),
                password: encryptedPassword,
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                username: faker.internet.username(),
                created_at: new Date(),
                updated_at: new Date(),
            } as users;
        })
    );

    return users;
}
