const express = require('express')

const routes = require('./routes')

const app = express()

app.use(express.json())  // body parser

app.use((request, response, next) => {  // cors
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  response.setHeader('Access-Control-Max-Age', '60')
  next()
})

app.use((request, response, next) => {
  console.log(request.method, request.originalUrl)
  next()
})

app.use(routes)


app.listen(3001, () => console.log('App started at http://localhost:3001/'))