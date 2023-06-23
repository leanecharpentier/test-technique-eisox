/** Version native MongoDB
const { MongoClient, ObjectId } = require('mongodb') 
const connectionUrl = 'mongodb://localhost:27017'
const dbName = 'test-eisox'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    console.log('Connected successfully to server')
    db = client.db(dbName)
  })


const findDocument = async () => {
  const collection = db.collection('numbers');
  const document = await collection.findOne();
  return document;
};

const findResult = async (key, document) => {
  return document[key];
};

const updateResult = async (key, value, document) => {
  const collection = db.collection('numbers');
  const filter = { _id: new ObjectId(document._id) };
  const update = { $set: { [key]: value } };
  const result = await collection.updateOne(filter, update);
  return result
};


module.exports = { init, updateResult, findResult, findDocument }
*/


// Version avec Mongoose
const mongoose = require('mongoose');
const { Numbers } = require('./models.js')

async function init() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test-eisox');
}

const findDocument = async () => {
  const document = await Numbers.findOne()
  return document
}

const findResult = async (key, document) => {
  return document[key];
}

const updateResult = async (key, value, document) => {
  document[key] = value;
  await document.save();
};

async function close() {
  await mongoose.disconnect();
  console.log('Database closed')
}

module.exports = { init, findDocument, findResult, updateResult, close }