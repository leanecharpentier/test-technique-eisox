// Calcul de la somme
function sum(tab) {
  let somme = 0;
  for (const element of tab) {
    somme += element;
  }
  return somme;
}

// Calcul somme des factorielle
function sumFact(tab) {
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
  return sommeFact;
}

// Calcul de la multiplication
function multiplication(tab) {
  let multiplication = 1;
  for (const element of tab) {
    if (element == 0) {
      return 0;
    } else {
      multiplication *= element;
    }
  }
  return multiplication;
}

// Calcul de la division
function division(tab) {
  let division = tab[0];
  for (let i = 1; i < tab.length; i++) {
    if (tab[i] == 0) {
      const message = "Il n'est pas possible de diviser par 0";
      return message;
    } else {
      division /= tab[i];
    }
  }
  return division;
}

module.exports = { sum, sumFact, multiplication, division}
