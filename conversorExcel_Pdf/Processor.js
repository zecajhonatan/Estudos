class Processor {

  static Process(data) {
    // metodo split --> faz a separação de strings dentro de um array baseado meum caracter especial
    let a = data.split("\r\n")
    // (\r) --> representa uma quebra de linha do sitema operacional
    // (\n) --> representa uma quebra de linha expressão regular
    let rows = []
    a.forEach(row => {
      let arr = row.split(",")
      rows.push(arr)
    });
    return rows
  }
}

module.exports = Processor



// --------------------------------


// let fs = require('fs')

// class Processes {
//   static Read(path) {
//     fs.readFile(path, { encoding: 'utf-8' }, (error, result) => {
//       if (error) {
//         console.log(error)
//       } else {
//         console.log(result)
//         this.Write(path, result)
//       }
//     })
//   }

//   static Write(path, data) {
//     let resultado = JSON.parse(data)
//     resultado.nome = "Zeca"
//     resultado.curso = "Pyton"
//     let res = JSON.stringify(resultado)
//     fs.writeFile(path, res, (error) => {
//       if (error) {
//         console.log(error)
//       }
//     })
//   }
// }

// module.exports = Processes