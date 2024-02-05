import express from 'express'
import mysql from 'mysql'
let app = express()
const PORT = 3000
let table = 'test_table'

app.use(express.json())

let conexao = mysql.createConnection({
  host: 'localhost',
  port: 3306, // --> porta padrão do mysql
  user: 'root',
  password: 'Juliae090320132023',
  database: 'teste' // --> nome do DATABASE
})
conexao.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('connecting to server mysql')
})

// cria uma DATABASE no banco de dados MYSQL
app.get('/createDatabase', (req, res) => {
  let query = 'CREATE DATABASE IF NOT EXISTS teste;' // instrução sql
  conexao.query(query, (err, results) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log('Banco de dados criado com sucesso!')
      res.send(results)
    }
  })
})

// criar uma tabela em um DATABASE especifica 
app.get('/createTable', (req, res) => {
  let query = `CREATE TABLE IF NOT EXISTS ${table} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade int NOT NULL
  );`
  conexao.query(query, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send({ res: 'Tabela Criada', restults: results });
    }
  })
})

// deletar tabela DATABASE
app.get('/deletetable', (req, res) => {
  let query = `DROP TABLE ${table};`
  conexao.query(query, (err, results) => {
    if (err) {
      console.log(err.message)
    } else {
      res.send(results)
    }
  })
})

// CREATE
app.post('/register', (req, res) => {
  let dados = req.body
  let query = 'INSERT INTO test_table SET ?;'
  conexao.query(query, dados, (err, results) => {
    if (err) {
      console.log(err.message)
    } else {
      res.send({ res: 'Cadastrado', results: results })
    }
  })
})

// READ 
app.get('/read', (req, res) => {
  let query = 'SELECT * FROM test_table;'
  conexao.query(query, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send(results)
    }
  })
})

// READ BY ID
app.get('/read_By_Id/:id', async (req, res) => {
  let id = req.params.id
  let query = 'SELECT * FROM test_table WHERE nome = ? AND idade < 30;'
  conexao.query(query, id, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send(results)
    }
  })
})

app.put('/update_By_Id/:id', (req, res) => {
  let dados = req.body
  let id = req.params.id
  let query = 'UPDATE test_table SET ? WHERE id = ?;'
  conexao.query(query, [dados, id], (err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send(results)
    }
  })
})

app.delete('/delete_By_Id/:id', (req, res) => {
  let id = req.params.id
  let query = 'DELETE FROM test_table WHERE id = ?;'
  conexao.query(query, id, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send({ msg: 'success delete', data: results })
    }
  })
})

app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})









