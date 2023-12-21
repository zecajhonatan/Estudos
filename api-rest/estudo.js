import express, { json } from 'express'
import mysql from 'mysql'
let app = express()

const PORT = 3000

app.use(express.json())

let conexao = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Juliae090320132023',
  database: 'db_copa'
})

conexao.connect((error) => {
  if (error) console.log({ 'error': error })
  else console.log('Conexão com o banco de dados feita com sucesso!!!')
})

// CRUD

// CREATE
app.post('/cadastro', (request, response) => {
  let dados = request.body
  let sql = 'INSERT INTO pessoas SET ?;'
  conexao.query(sql, dados, (error, result) => {
    if (error) {
      response.status(404).json({ 'error': error })
    } else {
      response.status(200).json(result)
    }
  })
})

// READ
app.get('/visualizar', (request, response) => {
  let sql = 'SELECT * FROM pessoas;'
  conexao.query(sql, (error, result) => {
    if (error) response.status(404).json({ 'error': error })
    else response.status(200).json(result)
  })
})

// READ BY ID
app.get('/visualizarPorID/:id', (request, response) => {
  let id = request.params.id
  let sql = 'SELECT * FROM pessoas WHERE id = ?;'
  conexao.query(sql, id, (error, result) => {
    console.log(result)
    if (result == []) {
      response.send('Não exista cadastro nosse indice!!!')
    } else {
      if (error) response.status(404).json({ 'error': error })
      else response.status(200).json(result)
    }
  })
})

app.put('/atualizar/:id', (request, response) => {
  let dados = request.body
  let id = request.params.id
  let sql = 'UPDATE pessoas SET ? WHERE id = ?;'
  conexao.query(sql, [dados, id], (error, result) => {
    if (error) {
      response.status(404).json({ 'error': error })
    } else {
      response.status(200).json(result)
    }
  })
})

app.delete('/delete/:id', (request, response) => {
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




// let pessoas = []

// function pegarPorID(id) {
//   return pessoas.filter(item => item.id == id)
// }

// function pegarIndice(id) {
//   return pessoas.findIndex(item => item.id == id)
// }

// // CREATE
// app.post('/cadastro', (request, response) => { // solicitação | resposta
//   let dados = request.body
//   pessoas.push(dados)
//   response.status(200).send('Cadastro feito com sucesso!!!')
// })

// // READ
// app.get('/visualizar', (request, response) => {
//   response.status(200).json(pessoas)
// })

// // READ BY ID
// app.get('/visualizarPorID/:id', (request, response) => {
//   let id = request.params.id
//   let dados = pegarPorID(id)
//   response.status(200).json(dados)
// })

// // ATUALIZAR
// app.put('/atualizacao/:id', (request, response) => {
//   let id = request.params.id
//   let indice = pegarIndice(id)
//   pessoas[indice].nome = request.body.nome
//   pessoas[indice].sobrenome = request.body.sobrenome
//   response.status(200).json(pessoas)
// })

// // DELETAR
// app.delete('/deletar/:id', (request, response) => {
//   let id = request.params.id
//   let indice = pegarIndice(id)
//   pessoas.splice(indice, 1)
//   response.status(200).json(pessoas)
// })


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})
