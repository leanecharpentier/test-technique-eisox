const request = require("supertest");
const app = require("../app.js");

describe("GET /calculator/sum", () => {
  it("should return the result of the sum", function (done) {
    request(app)
      .get("/calculator/sum")
      .expect(200)
      .expect(function (res) {
        expect(res.body.result).toBe(20);
      })
      .end(done);
  });
});

describe("GET /calculator/factSum", () => {
  it("should return the result of the factSum", function () {
    request(app).get("/calculator/factSum").expect(200);
  });
});

describe("GET /calculator/multiplication", () => {
  it("should return the result of the multiplication", function () {
    request(app).get("/calculator/multiplication").expect(200);
  });
});

describe("GET /calculator/division", () => {
  it("should return the result of the division", function () {
    request(app).get("/calculator/division").expect(200);
  });
});

describe("GET /calculator/", () => {
  it("should return all result", function () {
    request(app).get("/calculator/").expect(200);
  });
});
