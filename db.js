const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://localhost:27017'
const dbName = 'test-eisox'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    console.log('Connected successfully to server')
    db = client.db(dbName)
  })


const insertResult = (key, result) => {
    const collection = db.collection('numbers')
    return collection.insertOne({[key]: result})
}

const findResult = async (key) => {
    const collection = db.collection('numbers');
    const result = await collection.findOne({ [key]: { $exists: true } });
    return result;
  };
  


module.exports = { init, insertResult, findResult }
