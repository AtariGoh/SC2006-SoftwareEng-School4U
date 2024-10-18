// backend/tests/chatRoutes.test.js
const request = require("supertest");
const app = require("../server"); // Import your Express app

describe("Chat API", () => {
  it("should fetch all chat rooms", async () => {
    const res = await request(app).get("/api/chats");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should allow a user to join a chat room", async () => {
    const res = await request(app)
      .post("/api/chats/join")
      .send({
        userId: "testUser123",
        chatRoomId: 1
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe("Successfully joined the chat room!");
  });
});
