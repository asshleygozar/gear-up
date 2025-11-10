import request from "supertest";
import app from "../../src/app";
import { env } from "../../env";
import { describe, expect, it } from "vitest";

describe("Authentication Endpoints", () => {
    describe("POST /auth/signup", () => {
        it("should register new user with valid data", async () => {
            const userData = {
                email: "test@gmail.com",
                username: "testuser",
                password: "myPassword",
            };
            const response = await request(app).post("/auth/signup").send(userData).expect(201);
            expect(response.body).toHaveProperty("data");
            expect(response.body).toHaveProperty("token");
            expect(response.body.data).not.toHaveProperty("password");
        });
    });
});
