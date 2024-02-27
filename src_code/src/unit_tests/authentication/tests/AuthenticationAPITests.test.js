import request from "supertest";
import server from "../../../../express_app/app";
import db from "../../../configurations/database/DatabaseConfigurations";

describe("POST /api/authentication/sign-up", () => {
  afterAll(async () => {
    /** Close the server to prevent Jest from hanging */
    await new Promise((resolve) => {
      server.close(() => {
        resolve();
      });
    });

    await db("reviewer_account").where("USERNAME", "=", "test.account").del();
    await db.destroy();
  });

  it("should return sign up successfully", async () => {
    const requestBody = {
      fullName: "Test Account",
      emailAddress: "test.account@gmail.com",
      username: "test.account",
      password: "test.account.password",
    };

    const info = {
      message: "Your account successfully created.",
      responseObject: requestBody,
    };

    const response = await Promise.resolve(
      request(server).post("/api/authentication/sign-up").send(requestBody)
    );

    expect(response.body.success).toBe("ok");
    expect(response.body.info).toStrictEqual(info);
  });

  it("should return error success if request body is missing", async () => {
    const response = await Promise.resolve(
      request(server).post("/api/authentication/sign-up").send({})
    );

    expect(response.body.success).toBe("error");
    expect(response.body.code).toBe(400);
    expect(response.body.info.message).toBe("Request body is empty.");
  });

  it("should return missing required fields", async () => {
    const requestBody = {
      fullName: "",
      emailAddress: "",
      username: "",
      password: "",
    };

    const info = {
      message: "Full Name is required.",
      errors: [
        "Full Name is required.",
        "Email Address is required.",
        "Username is required.",
        "Password is required.",
      ],
    };

    const response = await Promise.resolve(
      request(server).post("/api/authentication/sign-up").send(requestBody)
    );

    expect(response.body.success).toBe("error");
    expect(response.body.code).toBe(400);
    expect(response.body.info).toStrictEqual(info);
  });

  it("should return invalid type", async () => {
    const requestBody = {
      fullName: 1,
      emailAddress: 2,
      username: 3,
      password: 4,
    };

    const info = {
      message: "Invalid type for full name.",
      errors: [
        "Invalid type for full name.",
        "Invalid type for email address.",
        "Invalid type for username.",
        "Invalid type for password.",
      ],
    };

    const response = await Promise.resolve(
      request(server).post("/api/authentication/sign-up").send(requestBody)
    );

    expect(response.body.success).toBe("error");
    expect(response.body.code).toBe(400);
    expect(response.body.info).toStrictEqual(info);
  });

  it('should return "Username must be longer than 6 and less than 50 characters." if username < 6 characters', async () => {
    const requestBody = {
      fullName: "Test User",
      emailAddress: "testuser@gmail.com",
      username: "2char",
      password: "2charusername",
    };

    const info = {
      message: "Username must be longer than 6 and less than 50 characters.",
      errors: ["Username must be longer than 6 and less than 50 characters."],
    };

    const response = await Promise.resolve(
      request(server).post("/api/authentication/sign-up").send(requestBody)
    );

    expect(response.body.success).toBe("error");
    expect(response.body.code).toBe(400);
    expect(response.body.info).toStrictEqual(info);
  });

  it('should return "Username must be longer than 6 and less than 50 characters." if username > 50 characters', async () => {
    const requestBody = {
      fullName: "Test User",
      emailAddress: "testuser@gmail.com",
      username: "somerandomusernamethatisdefinitelylongerthan50characters",
      password: "longerthan50charpassword",
    };

    const info = {
      message: "Username must be longer than 6 and less than 50 characters.",
      errors: ["Username must be longer than 6 and less than 50 characters."],
    };

    const response = await Promise.resolve(
      request(server).post("/api/authentication/sign-up").send(requestBody)
    );

    expect(response.body.success).toBe("error");
    expect(response.body.code).toBe(400);
    expect(response.body.info).toStrictEqual(info);
  });
  it('should return "Username already exists."', async () => {
    const requestBody = {
      fullName: "Test User",
      emailAddress: "testuser@gmail.com",
      username: "test.account",
      password: "longerthan50charpassword",
    };

    const info = {
      message: "Username already exists.",
      errors: ["Username already exists."],
    };

    const response = await Promise.resolve(
      request(server).post("/api/authentication/sign-up").send(requestBody)
    );

    expect(response.body.success).toBe("error");
    expect(response.body.code).toBe(400);
    expect(response.body.info).toStrictEqual(info);
  });
});
