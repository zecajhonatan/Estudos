let fs = require('fs') // file system
let util = require('util') // nesse modulo tem varias funções que são uteis para o desenvolvimento do codigo

class Reader {

  constructor() {
    // metodo promisify --> converte uma função que nao e uma promise em uma função com promise
    // a função readFile nativa do node não retorna uma promise.
    this.read = util.promisify(fs.readFile)
  }

  async Read(filePath) {
    try {
      return await this.read(filePath, { encoding: 'utf-8' })
    } catch (error) {
      return undefined
    }
  }

}

// module.exports = Reader
module.exports = Reader 

// responsabilidade dessa classe e ler o arquivo e retornar os dados
