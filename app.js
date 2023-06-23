const express = require("express");
const { findResult, updateResult, findDocument } = require("./db");
const { sum, sumFact, multiplication, division } = require("./calculs.js");

const router = express.Router();

//Tous les calculs ensemble
async function allCalculs() {
  const somme = await save("resultSum", sum);
  const sommeFact = await save("resultSumFact", sumFact);
  const multi = await save("resultMultiplication", multiplication);
  const divi = await save("resultDivision", division);
  return {
    resultSum: somme,
    resultSumFact: sommeFact,
    resultMultiplication: multi,
    resultDivision: divi,
  };
}

// Retourne le resultat du calcul
async function save(key, calcul) {
  try {
    const findDocumentResult = await findDocument();
    const arrayNumbers = findDocumentResult.numbers;
    if (key != "resultAll") {
      const result = await findResult(key, findDocumentResult);
      if (result) {
        console.log("The result is allready in database");
        return findDocumentResult[key];
      } else {
        console.log("The result was not in database");
        const resultCalcul = calcul(arrayNumbers);
        await updateResult(key, resultCalcul, findDocumentResult);
        return resultCalcul;
      }
    } else {
      const resultCalcul = await calcul(arrayNumbers);
      return resultCalcul;
    }
  } catch (error) {
    console.error(error);
  }
}

// Routes

router.get("/calculator/sum", async (req, res, next) => {
  const result = await save("resultSum", sum);
  res.status(200).json(result);
});

router.use("/calculator/factSum", async (req, res, next) => {
  const result = await save("resultSumFact", sumFact);
  res.status(200).json(result);
});

router.use("/calculator/multiplication", async (req, res, next) => {
  const result = await save("resultMultiplication", multiplication);
  res.status(200).json(result);
});

router.use("/calculator/division", async (req, res, next) => {
  const result = await save("resultDivision", division);
  res.status(200).json(result);
});

router.use("/calculator", async (req, res) => {
  const result = await save("resultAll", allCalculs);
  res.status(200).json(result);
});

module.exports = router;
