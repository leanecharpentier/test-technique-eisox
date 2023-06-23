const express = require('express')
const bodyParser = require('body-parser')
const { init } = require('./db.js')
const routes = require('./app.js')
const { close } = require("./db.js");
let server;

const app = express()
app.use(bodyParser.json())
app.use(routes)

init().then(() => {
  console.log('Starting server on port 3000')
  server = app.listen(3000)
})

async function closeServer () {
  await close()
  server.close()
}

module.exports = { app, closeServer}
