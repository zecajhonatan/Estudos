class Table {
  constructor(arr) {
    this.header = arr[0]
    arr.shift() // exluindo o primeiro elemento do array
    this.rows = arr
  }

  // (get) --> tranforma um metodo da classe em um atributo | todas as vezes que utilizar o get, o metodo tem que (return) alguma coisa
  get RowCount() {
    return this.rows.length
  }

  get ColumnCount() {
    return this.header.length
  }
}

module.exports = Table