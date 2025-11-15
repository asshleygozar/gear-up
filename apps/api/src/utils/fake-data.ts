import { hashPassword } from "#lib/password.js";
import { faker } from "@faker-js/faker";
import type { SignUpValidation } from "#lib/auth.js";

export const testUser = async () => {
    const rawPassword = faker.internet.password();
    const hashedPassword = await hashPassword(rawPassword);
    const user = {
        email: faker.internet.email(),
        username: faker.internet.username(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        password: hashedPassword,
    };
    console.log(`📧 Test email: ${user.email}`);
    console.log(`🧪Test password: ${rawPassword}`);
    return user as SignUpValidation;
};
