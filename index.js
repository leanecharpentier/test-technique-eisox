const express = require('express')
const bodyParser = require('body-parser')
const { init, close } = require('./db.js')
const routes = require('./app.js')

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
  server.close(() => {
    console.log('Server closed');
  })
}

module.exports = { app, closeServer}
