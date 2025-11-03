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

if (import.meta.url === `file://${process.argv[1]}`)
    seed()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));

export default seed;
