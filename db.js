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
  if (document[key]) {
    return true 
  } else {
    return false
  }
};

const updateResult = async (key, value, document) => {
  const collection = db.collection('numbers');
  const filter = { _id: new ObjectId(document._id) };
  const update = { $set: { [key]: value } };
  const result = await collection.updateOne(filter, update);
  return result
};


module.exports = { init, updateResult, findResult, findDocument }
