import { testUser } from "#utils/fake-data.ts";
import { UserModel } from "#models/user.model.ts";
import { pathToFileURL } from "url";

const seed = async () => {
    console.log("🌱 Starting database seed...");

    try {
        const fakeUser = await testUser();
        await UserModel.create({ data: fakeUser });
        console.log("✅ User seeded successfully!");
    } catch (error) {
        console.log("Database error: ", error);
        throw error;
    }
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    seed()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

export default seed;
