const express = require('express')
const { findResult, updateResult, findDocument } = require('./db')

const router = express.Router()

// Calcul de la somme
function sum (tab) {
  let somme = 0;
  for (const element of tab) {
    somme += element;      
  }
  return somme
}


// Calcul somme des factorielle
function sumFact (tab) {
  let sommeFact = 0;
  for (const element of tab) {
    // Fonction factorielle
    let fact = 1;
    if (element < 0) {
      fact = 0;
    } else {
      for (let nb = 1; nb <= element; nb++) {
        fact *= nb;          
      }
    }
    // Somme des factorielles
    sommeFact += fact;
  }
  return sommeFact
}


// Calcul de la multiplication
function multiplication (tab) { 
  let multiplication = 1;
  for (const element of tab) {
    if (element == 0) {
      return 0
    } else {
      multiplication *= element; 
    }    
  }
  return multiplication
}
  

// Calcul de la division
function division (tab) {
  let division = tab[0];
  for (let i = 1; i < tab.length; i++) {
    if (tab[i] == 0) {
      const message = 'Il n\'est pas possible de diviser par 0'
      return message
    } else {
      division /= tab[i];
    }
  }
  return division
}

//Tous les calculs ensemble
async function allCalculs () {
  const somme = await save('resultSum', sum);
  const sommeFact = await save('resultSumFact', sumFact);
  const multi = await save('resultMultiplication', multiplication);
  const divi =  await save('resultDivision', division);
  return {resultSum: somme, resultSumFact: sommeFact, resultMultiplication: multi, resultDivision: divi}

}


async function save (key, calcul) { 
  try {
    const findDocumentResult = await findDocument();
    const arrayNumbers = findDocumentResult.numbers ;
    if (key != 'resultAll') {
      const result = await findResult(key, findDocumentResult);
      if (result) {
        console.log('The result is allready in database');
        return findDocumentResult[key]
      } else {
        console.log('The result was not in database');
        const resultCalcul = calcul(arrayNumbers) ;
        await updateResult(key, resultCalcul, findDocumentResult)
        return resultCalcul
      }
    } else {
      const resultCalcul = await calcul(arrayNumbers) ;
      return resultCalcul;
    }
    
  } catch (error) {
    console.error(error);
  } 
};


// Routes 

router.use('/calculator/sum', async (req, res, next) => {
  const result = await save('resultSum', sum)
  res.status(200).json(result);
});

router.use('/calculator/factSum', async (req, res, next) => {
  const result = await save('resultSumFact', sumFact)
  res.status(200).json(result);
});


router.use('/calculator/multiplication', async (req, res, next) => {
  const result = await save('resultMultiplication', multiplication)
  res.status(200).json(result);
});


router.use('/calculator/division', async (req, res, next) => {
  const result = await save('resultDivision', division)
  res.status(200).json(result);
});


router.use('/calculator', async (req, res) => {
  const result = await save('resultAll', allCalculs)
  res.status(200).json(result);
});



module.exports = router
