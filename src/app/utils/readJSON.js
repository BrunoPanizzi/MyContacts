const fs = require('fs')

module.exports = function readJSON(path) {
  let data = fs.readFileSync(path)
  if (data) {
    return JSON.parse(data)
  }
}