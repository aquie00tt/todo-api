import request from "supertest";
import { app } from "../src/app";
import UserController from "../src/controllers/UserController";
import { IUser } from "../src/types/user";

// Test user model
const testModel: IUser = {
    username: "testuser",
    password: "testuser123",
    email: "testuser0@gmail.com",
    name: "Test"
} as IUser;

describe("POST /auth/register, POST /auth/login, and POST /auth/refresh-token", () => {
    // Runs before each test to ensure a clean state
    beforeEach(async () => {
        // Delete the user if it already exists to avoid conflicts
        const user = await UserController.findUserByIdentifier("testuser");
        if (user) {
            await UserController.deleteUser(user.username);
        }
    });

    // Test case for successful user registration
    it("should successfully register a user", async () => {
        // Send a POST request to /auth/register with the test user data
        const response = await request(app).post("/auth/register").send(testModel);

        // Verify that the response status code is 201 (Created)
        expect(response.statusCode).toBe(201);
    });

    // Test case for successful login using username and password
    it("should successfully log in with username and password", async () => {
        // Create the test user
        await UserController.createUser(testModel);

        // Send a POST request to /auth/login with the username and password
        const response = await request(app).post("/auth/login").send({
            identifier: testModel.username,
            password: testModel.password
        });

        // Verify that the response status code is 201 (Created)
        expect(response.statusCode).toBe(201);
        // Verify that the response body contains an access token
        expect(response.body.access_token).toBeDefined();
    });

    // Test case for successful login using email and password
    it("should successfully log in with email and password", async () => {
        // Create the test user
        await UserController.createUser(testModel);

        // Send a POST request to /auth/login with the email and password
        const response = await request(app).post("/auth/login").send({
            identifier: testModel.email,
            password: testModel.password
        });

        // Verify that the response status code is 201 (Created)
        expect(response.statusCode).toBe(201);
        // Verify that the response body contains an access token
        expect(response.body.access_token).toBeDefined();
    });

    // Test case for successful token refresh
    it("should successfully refresh the token and create a new access token", async () => {
        // Create the test user and obtain refresh token
        await UserController.createUser(testModel);
        
        const loginResponse = await request(app).post("/auth/login").send({
            identifier: testModel.email,
            password: testModel.password
        });

        // Send a POST request to /auth/refresh-token with the refresh token
        const refreshTokenResponse = await request(app).post("/auth/refresh-token").send({
            refresh_token: loginResponse.body.refresh_token
        });

        // Verify that the response body contains a new access token
        expect(refreshTokenResponse.body.access_token).toBeDefined();
    });
});
