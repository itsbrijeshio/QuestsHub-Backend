import request from "supertest";
import app from "../src/app";
import { clearTestDB, connectTestDB, disconnectTestDB } from "./setup/testDB";

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await clearTestDB();
  await disconnectTestDB();
});

let accessToken = "";
describe("Auth Routes - Test", () => {
  it("POST /api/auth/register - should register a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "KZy6D@example.com",
      password: "password123",
    };

    const res = await request(app).post("/api/auth/register").send(newUser);
    expect(res.status).toBe(201);
    expect(res.body.data.user.email).toBe(newUser.email);
  });

  it("POST /api/auth/login - should login and return access token", async () => {
    const user = {
      email: "KZy6D@example.com",
      password: "password123",
    };

    const res: any = await request(app).post("/api/auth/login").send(user);
    
    accessToken = res.body.accessToken;
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("GET /api/auth/me - should return logged in user info", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("x-access-token", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
  });
});
