const assert = require('assert');
const {sum, sumFact, multiplication, division} = require("./calculs.js")

// Test de la fonction Sum
describe("Array Sum", function () {
  it("should return the result", function () {
    assert.equal(sum([1, 2, 3]), 6);
  });
});

// Test de la fonction SumFact
describe("array fact sum", function () {
  it("should return -1 when the value isnt correct", function () {
    assert.equal(sumFact([1, 2, 3]), 9);
  });
});

// Test de la fonction Division
describe("array division", function () {
  it("should return 0", function () {
    assert.equal(division([0, 1, 2, 3]), 0);
  });
  it("should return 'la division par 0 est impossible'.", function () {
    assert.equal(
      division([1, 2, 0, 3]),
      "Il n'est pas possible de diviser par 0"
    );
  });
  it("should return the result", function () {
    assert.equal(division([20, 10, 2]), 1);
  });
});

// Test de la fonction Multiplication
describe("array multiplication", function () {
  it("should return 0", function () {
    assert.equal(multiplication([1, 2, 0, 5]), 0);
  });
  it("should return the result", function () {
    assert.equal(multiplication([1, 2, 3]), 6);
  });
});
