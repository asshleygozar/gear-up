import request from "supertest";
import { faker } from "@faker-js/faker";
import app from "#/src/app.js";
import { cleanUpDatabase } from "#/tests/helpers/db.js";
import { describe, afterEach, it, expect } from "vitest";

describe("Authentication Endpoints", () => {
    afterEach(async () => {
        await cleanUpDatabase();
    });
    describe("POST /auth/signup", () => {
        it("should register new user with valid data", async () => {
            const userData = {
                email: faker.internet.email(),
                username: faker.internet.username(),
                password: faker.internet.password(),
            };
            const response = await request(app).post("/auth/signup").send(userData).expect(201);
            expect(response.body).toHaveProperty("data");
            expect(response.body).toHaveProperty("token");
            expect(response.body.data).not.toHaveProperty("password");
        });
    });
});
