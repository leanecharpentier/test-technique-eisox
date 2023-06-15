const express = require('express')
const { insertResult, findResult } = require('./db')

const router = express.Router()

// Calcul de la somme
function sum (tab) {
  var somme = 0;
  for (let i = 0; i < tab.length; i++) {
    somme += tab[i];      
  }
  return somme
}


// Calcul somme des factorielle
function sumFact (tab) {
  var sommeFact = 0;
  for (let i = 0; i < tab.length; i++) {
    // Fonction factorielle
    var fact = 1;
    if (tab[i] == 0) {
      fact = 1;
    } else if (tab[i] < 0) {
      fact = 0;
    } else {
      for (let nb = 1; nb <= tab[i]; nb++) {
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
  var multiplication = 1;
  for (let i = 0; i < tab.length; i++) {
    if (tab[i] == 0) {
      return 0
    } else {
      multiplication *= tab[i]; 
    }    
  }
  return multiplication
}
  

// Calcul de la division
function division (tab) {
  var division = tab[0];
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
function allCalculs (tab) {
  const somme = sum(tab);
  const sommeFact = sumFact(tab);
  const multi = multiplication(tab);
  const divi = division(tab);
  return {resultSum: somme, resultSumFact: sommeFact, resultMultiplication: multi, resultDivision: divi}
}

console.log(allCalculs([ -2, 1, 2]))
  

// Fonction qui calcule et enregistre si le résultat n'est pas encore dans la base de données

function save (key, res, calcul) {  
  findResult([key])
    .then((result) => {
      if (result !== null) {
        console.log('Le résultat est déjà dans la base de données');
        console.log(result[key]);
        res.status(200).json({ result: result[key] });
      } else {
        findResult('numbers')
          .then((array) => {
            const result = calcul(array.numbers);
            console.log(result);
            insertResult([key], result)
              .then(() => {
                console.log('Le résultat a bien été enregistré dans la base de données');
                res.status(200).json({ result: result });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).end();
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).end();
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
};

// Routes 

router.use('/calculator/sum', (req, res, next) => {
  save('resultSum', res, sum)
});

router.use('/calculator/factSum', (req, res, next) => {
  save('resultSumFact', res, sumFact)
});


router.use('/calculator/multiplication', (req, res, next) => {
  save('resultMultiplication', res, multiplication)
});


router.use('/calculator/division', (req, res, next) => {
  save('resultDivision', res, division)
});


router.use('/calculator', (req, res, next) => {
  save('resultAll', res, allCalculs)
});




module.exports = router
