const { Client } = require('pg')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
})

client.connect()

const Query = async (query, values) => {
  const { rows } = await client.query(query, values)
  return rows
}

exports.query = Query