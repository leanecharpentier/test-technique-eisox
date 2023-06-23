const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
    numbers: Array,
    resultSum: Number,
    resultMultiplication: Number,
    resultDivision: Number,
    resultSumFact: Number 
  })
  
const Numbers = mongoose.model('Numbers', numberSchema);

module.exports = { Numbers }