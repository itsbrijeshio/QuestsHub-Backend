import { env } from "../../src/config";

describe("Environment Test", () => {
  it("should load test environment variables", () => {
    expect(env.NODE_ENV).toBe("test");
    expect(env.MONGODB_URL).toMatch(/quests-hub-test/);
  });
});
