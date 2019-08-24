import { expect } from "chai";
import request from "supertest";
import app from "../app";

describe("# API 테스트", () => {
  describe("- /check", () => {
    it("GET /", () => {
      return request(app)
        .get("/check")
        .expect(200)
        .then(res => {
          expect(res.text).to.equal("ok");
        });
    });
  });
});
