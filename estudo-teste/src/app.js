import express from 'express'
let app = express()

import bodyParser from 'body-parser'

import Pergunta from '../database/pergunta.js' // tabela do banco de dados
import Resposta from '../database/Resposta.js' // tabela do banco de dados

import connection from '../database/database.js' // conexão com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com o banco de dados!!!')
  })
  .catch((error) => {
    console.log({ 'error': error })
  })

app.use(express.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (request, response) => {
  Pergunta.findAll({ raw: true, order: [['id', 'desc']] }).then(perguntas => {
    response.render('index.ejs', {
      perguntas: perguntas
    })
  })
})

app.get('/perguntar', (request, response) => {
  response.render('perguntar.ejs')
})

app.post('/salvarPergunta', (request, response) => {
  let titulo = request.body.titulo
  let descricao = request.body.descricao
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    response.redirect('/')
  })
})

app.get('/pergunta/:id', (request, response) => {
  let id = request.params.id
  Pergunta.findOne({
    where: { id: id }, raw: true
  }).then(pergunta => {
    if (pergunta != undefined) {
      Resposta.findAll({
        raw: true,
        where: { perguntaId: pergunta.id },
        order: [['id', 'desc']]
      }).then(respostas => {
        response.render('pergunta.ejs', {
          pergunta: pergunta,
          respostas: respostas
        })
      })
    } else {
      response.redirect('/')
    }
  })
})

app.post('/responder', (request, response) => {
  const corpo = request.body.corpo
  const perguntaId = request.body.perguntaId
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    response.redirect('/pergunta/' + perguntaId)
  })
})







export default app

