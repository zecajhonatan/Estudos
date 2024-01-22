let fs = require('fs')
let util = require('util')

class Write {
  constructor() {
    this.write = util.promisify(fs.writeFile) // essa metodo recebe uma promise
  }

  async Write(fileName, data) {
    try {
      await this.write(fileName, data)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = Write