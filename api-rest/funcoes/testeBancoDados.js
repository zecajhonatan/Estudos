import express from 'express'
import mysql from 'mysql'
const app = express()
const port = 3000

let testeDados = []

app.use(express.json())

// CONEXÃO COM O BANCO DE DADOS
let conexao = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Juliae090320132023',
  database: 'db_copa'
})
conexao.connect((error) => {
  if (error) {
    console.log({ 'error': error })
  } else {
    console.log(`Conexão com o bando de dados feita com sucesso`)
  }
})

app.post('/cadastro', (request, response) => {
  let dados = request.body
  let sql = 'INSERT INTO pessoas SET ?;'

  conexao.query(sql, [dados], (error, result) => {
    if (error) {
      response.status(404).json(error)
    } else {
      response.status(201).json(result)
    }
  })
})

app.get('/visualizar', (request, response) => {
  let sql = 'SELECT * FROM pessoas;' // instrução sql 

  conexao.query(sql, (error, result) => {
    if (error) {
      response.status(404).json({ 'error': error })
    } else {
      response.status(200).json(result)
    }
  })
})

app.get('/visualizarPorID/:id', (request, response) => {
  let id = request.params.id
  let sql = 'SELECT * FROM pessoas WHERE id = ?;'

  conexao.query(sql, [id], function (error, result) {
    if (error) {
      response.status(404).json({ 'error': error })
    } else {
      response.status(200).json(result)
    }
  })
})

app.put('/atualizar/:id', (request, response) => {
  let dados = request.body
  let id = request.params.id

  const sql = 'UPDATE pessoas SET ? WHERE id = ?;' // instrução sql

  conexao.query(sql, [dados, id], (error, result) => {
    if (error) {
      response.status(404).json({ 'error': error })
    } else {
      response.status(200).json(result)
    }
  })
})

app.delete('/deletar/:id', (request, response) => {
  let id = request.params.id

  let sql = 'DELETE FROM pessoas WHERE id = ?;'

  conexao.query(sql, id, (error, result) => {
    if (error) {
      response.status(404).json({ 'error': error })
    } else {
      response.status(200).json(result)
    }
  })
})



// CRIAÇÃO DO SERVIDOR
app.listen(port, () => {
  console.log(`Servidor rodando na porta: http://localhost:${port}`)
})





















