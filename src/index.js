const express = require('express')
require('express-async-errors')

const routes = require('./routes')

const app = express()

// body parser
app.use(express.json())

// cors
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  response.setHeader('Access-Control-Max-Age', '60')
  next()
})

// logging incoming requests
app.use((request, response, next) => {
  console.log(request.method, request.originalUrl)
  next()
})

// routes
app.use(routes)

// error handler
app.use((error, request, response, next) => {
  console.log(error)
  response.sendStatus(500)
})

app.listen(3001, () =>
  console.log('App started at http://localhost:3001/')
)
