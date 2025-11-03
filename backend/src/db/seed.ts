import { createManyUser } from "#model/user.ts";
import { generateFakeUsers } from "#utils/fake-data.ts";

const seed = async () => {
    const fakeUsers = await generateFakeUsers();
    console.log("🫘  Starting database seed....");

    try {
        await createManyUser(...fakeUsers);
        console.log("User seeded succesfully!");
    } catch (error) {
        console.error("Database error: ", error);
        throw error;
    }
};

seed();
