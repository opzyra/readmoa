import { expect } from "chai";
import request from "supertest";
import routes from "../routes";
import app from "../app";

describe("# 에러 핸들링 테스트", () => {
  describe("- 잘못된 요청을 하는 경우", () => {
    it("GET /endpoint", () => {
      return request(app)
        .get("/endpoint")
        .expect(404)
        .then(res => {
          const { message } = res.body;
          expect(message).to.equal("잘못된 접근 입니다.");
        });
    });
  });

  describe("- 시스템 에러가 발생하는 경우", () => {
    before("에러 테스트용 라우터 주입", () => {
      routes.get("/error", (req, res, next) => {
        throw new Error();
      });
    });

    it("GET /error", () => {
      return request(app)
        .get("/error")
        .expect(500)
        .then(res => {
          const { message } = res.body;
          expect(message).to.equal("시스템 오류가 발생하였습니다.");
        });
    });
  });
});
