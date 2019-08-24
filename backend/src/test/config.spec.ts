import { expect } from "chai";
import request from "supertest";
import app from "../app";
import { getConnection, getManager } from "typeorm";

describe("# 테스트 환경 초기화", () => {
  it("API서버가 작동한다.", () => {
    return request(app)
      .get("/check")
      .expect(200)
      .then(res => {
        expect(res.text).to.equal("ok");
      });
  });

  it("테스트 데이터베이스에 연결이 되어있다.", async () => {
    const conn = getConnection();
    expect(conn.options.database).to.equal("readmoa_test");
    const em = getManager();
    const [rs] = await em.query("SELECT 1+1");
    expect(rs).not.null;
  });
});
