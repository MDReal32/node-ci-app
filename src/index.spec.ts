import request from "supertest";
import { Express } from "express";

import { createApp } from ".";

let app: Express;

beforeAll(async () => {
  app = createApp();
});

describe("200 Ok", () => {
  it("should return 200 OK", done => {
    request(app).get("/").expect(200, done);
  });

  // is app echo server?
  it("should return path", done => {
    const path = "/any-path";

    request(app).get(path).expect(path, done);
  });
});
