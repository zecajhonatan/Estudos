import express, { json } from 'express'
const app = express()
const PORT = 3000
import { carros, dadosPorId, buscarIndice } from './arquivos.js'

app.use(express.json())


// dizer para o express fazer a leitura do corpo em formato json 
app.use(express.json())

// seleciona e retorna elemento baseado no id
function selecionarItemPorId(id) {
  return carros.filter((item) => item.id == id)
}

// retorna o indice do elemento baseado na condição passada
function selecionarPeloIndex(id) {
  return carros.findIndex(item => item.id == id)
}

// cadastra um elemento no banco de dados | CRUD ==> CREATE
app.post("/cadastrarDados", (request, response) => {
  const carro = request.body
  carros.push(carro)
  response.status(200).send("Cadastro feito com sucesso!")
})

// mostra os dados na tela | CRUD ==> READ
app.get("/visualizarDados", (request, response) => {
  response.status(202).send(carros)
})

// seleciona os itens pelo ID e mostra na tela | CRUD ==> READ
app.get("/visualizarPorId/:id", (request, resposne) => {
  resposne.json(selecionarItemPorId(request.params.id))
})

// atualiza os dados desejados | CRUD ==> UPDATE

app.put("/atualizarDados/:id", (request, response) => {
  let index = selecionarPeloIndex(request.params.id)
  carros[index].nome = request.body.nome
  carros[index].ano = request.body.ano
  carros[index].cor = request.body.cor
  carros[index].valor = request.body.valor
  response.json(carros)
})

app.listen(PORT, () => {
  console.log(`Servidor Funcionando http://localhost:${PORT}/principal`)
})
































