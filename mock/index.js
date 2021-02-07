const fs = require('fs')

// This is a mock node script that reads the text from a matry file and loads it into a node environment
module.exports = (file) => {
  return fs.readFileSync(`./mock/${file}.matry`, 'utf8')
}
