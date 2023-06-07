var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Connexion à la base de données
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'test-eisox';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('numbers');


  // Ajout du tableau de nombre dans la base de données pour simuler la bdd de Eisox pour le test
  // const insertNumbers = await collection.insertOne({numbers:[1,2,3,-4,5,6]});

  // Aller chercher le seul document présent dans la collection
  const numbers = await collection.findOne();
  // Stocker les nombres dans une variable
  const arrayNumbers = numbers.numbers;

  // Calculer la somme
  var somme = 0;
    string = '';
    for (let i = 0; i < arrayNumbers.length; i++) {
      somme += arrayNumbers[i];
      if (arrayNumbers[i] < 0) {
        string += '(' + arrayNumbers[i].toString() + ') + ';
      } else if ( i+1 == arrayNumbers.length) {
        string += arrayNumbers[i].toString();
      } else {
        string += arrayNumbers[i].toString() + ' + ';
      }      
    }
  const reponseSum = string + ' = ' + somme;
  // Insertion du résultat de la somme dans la base de données
  const insertSum = await collection.insertOne({resultSum:somme});


  // Calcul somme des factorielle
  var sommeFact = 0;
    string = '';
    for (let i = 0; i < arrayNumbers.length; i++) {
      // Fonction factorielle
      var fact = 1;
      if (arrayNumbers[i] == 0) {
        fact = 1;
      } else if (arrayNumbers[i] < 0) {
        fact = 0;
      } else {
        for (let nb = 1; nb <= arrayNumbers[i]; nb++) {
          fact *= nb;          
        }
      }
      // Somme des factorielles
      sommeFact += fact;
      if (fact < 0) {
        string += '(' + fact.toString() + ') + ';
      } else if ( i+1 == arrayNumbers.length) {
        string += fact.toString();
      } else {
        string += fact.toString() + ' + ';
      }      
    }
  const reponseFactSum = string + ' = ' + sommeFact;
  // Insertion du résultat de la somme des factorielles dans la base de données
  const insertSumFact = await collection.insertOne({resultFactSum:sommeFact});


  // Calcul de la multiplication
  var multiplication = 1;
    string = '';
    for (let i = 0; i < arrayNumbers.length; i++) {
      multiplication *= arrayNumbers[i];
      if (arrayNumbers[i] < 0) {
        string += '(' + arrayNumbers[i].toString() + ') x ';
      } else if ( i+1 == arrayNumbers.length) {
        string += arrayNumbers[i].toString();
      } else {
        string += arrayNumbers[i].toString() + ' x ';
      }      
    }
  const reponseMultiplication = string + ' = ' + multiplication ;
  // Insertion du résultat de la multiplication dans la base de données
  const insertMultiplication = await collection.insertOne({resultMultiplication:multiplication});


  // Calcul de la division
  var division = 1;
    string = '';
    for (let i = 0; i < arrayNumbers.length; i++) {
      division /= arrayNumbers[i];
      if (arrayNumbers[i] < 0) {
        string += '(' + arrayNumbers[i].toString() + ') / ';
      } else if ( i+1 == arrayNumbers.length) {
        string += arrayNumbers[i].toString();
      } else {
        string += arrayNumbers[i].toString() + ' / ';
      }      
    }
  const reponseDivision = string + ' = ' + division;
  // Insertion du résultat de la division dans la base de données
  const insertDivision = await collection.insertOne({resultDivision:division});

  // Insertion de tous les résultats dans la base de données
  const insertAllResult = await collection.insertOne({allResult: [{resultSum: somme}, {resultFactSum: sommeFact}, {resultMultiplication: multiplication}, {resultDivision: division}]});



  // Routes Test technique Eisox

  router.use('/calculator/sum', (req, res, next) => {
    // Détail du calcul juste au dessus
    res.send(reponseSum);
  });


  router.use('/calculator/factSum', (req, res, next) => {
    // Détail du calcul juste au dessus
    res.send(reponseFactSum);
    
  });
  
  router.use('/calculator/multiplication', (req, res, next) => {
    // Détail du calcul juste au dessus
    res.send(reponseMultiplication);
  });
  
  router.use('/calculator/division', (req, res, next) => {
    // Détail du calcul juste au dessus
    res.send(reponseDivision);
  });
  
  router.use('/calculator', (req, res, next) => {
    res.send(reponseSum + '<br>' + reponseFactSum + '<br>' + reponseMultiplication  + '<br>' + reponseDivision);
  });

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());



module.exports = router;
