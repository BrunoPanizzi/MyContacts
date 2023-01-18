const { Client } = require('pg')

const variables = process.env

const client = new Client({
  host: variables['PGHOST'],
  port: variables['PGPORT'],
  user: variables['PGUSER'],
  password: variables['PGPASSWORD'],
  database: variables['PGDATABASE'],
})

client.connect()

const Query = async (query, values) => {
  const { rows } = await client.query(query, values)
  return rows
}

exports.query = Query
