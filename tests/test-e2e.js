const request = require("supertest");
const { app, closeServer } = require("../index.js");
const { init } = require("../db.js");

before(async function () {
  await init();
});

after(async () => {
  closeServer();
});

describe("GET /calculator/sum", () => {
  it("should return the result of the sum", (done) => {
    request(app)
      .get("/calculator/sum")
      .end(function (req, res) {
        const expectedResult = 13;
        if (res.body !== expectedResult) {
          throw new Error(`Expected ${expectedResult}, but got ${res.body}`);
        }
        done();
      });
  });
});

describe("GET /calculator/factSum", () => {
  it("should return the result of the factSum", (done) => {
    request(app).get("/calculator/factSum").expect(200);
    done();
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
