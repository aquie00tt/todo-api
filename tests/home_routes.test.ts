import request from "supertest";
import { app } from "../src/app";

// Test suite for the root endpoint
describe("GET /", () => {
    // Test case to check if the root endpoint returns a welcome message
    it("should return a welcome message", async () => {
        // Sending a GET request to the root endpoint
        const response = await request(app).get('/');
        
        // Asserting that the response status code is 200 (OK)
        expect(response.status).toBe(200);
        
        // Asserting that the response body contains the expected welcome message
        expect(response.body).toEqual({ message: "Welcome to api." });
    });

    it('should include x-request-id in the response header', async () => {
        const response = await request(app).get('/');
        expect(response.headers['x-request-id']).toBeDefined();
    });
});