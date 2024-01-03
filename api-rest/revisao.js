// verifica a instalação do node na maquina --> node -v
// e necessario a instalação do node na maquina --> 
// faz a instalação dos pacotes necessarios para a criação do projeto


// express --> responsavel pela criação do servidor local | npm install express --save
// nodemon --> responsavel pela atualização do projeta a cada mudaça feita | npm install nodemon --save
// mysql --> responsavel por fazer a conexão com o banco de dados | npm install mysql --save


import express from 'express'
const app = express()
const PORT = 3000

app.use(express.json())
let pessoas = []

function pegarId(id) {
  return pessoas.filter(item => item.id == id)
}

function pegarIndex(id) {
  return pessoas.findIndex(item => item.id == id)
}

app.post('/cadastrar', (req, res) => {
  let dados = req.body
  pessoas.push(dados)
  res.status(201).send('Cadastrado')
})

app.get('/visualizar', (req, res) => {
  res.status(200).send(pessoas)
})

app.get('/visualizarPorId/:id', (req, res) => {
  const id = req.params.id
  let dados = pegarId(id)
  res.status(200).send(dados)
})

app.put('/atualizar/:id', (req, res) => {
  let id = req.params.id
  let index = pegarIndex(id)
  pessoas[index].name = req.body.name
  res.status(200).send(pessoas)
})

app.delete('/delete/:id', (req, res) => {
  let id = req.params.id
  let index = pegarIndex(id)
  pessoas.splice(index, 1)
})

app.listen(PORT, () => {
  console.log(`Conexão feita na porta:http://localhost:${PORT}`)
})










