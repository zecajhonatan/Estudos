import express from "express"; // pacote ou modulo
import bodyParser from 'body-parser'
import connection from "./database/database.js";
// para usar as variaveis de ambiente 
import dotEnv from 'dotenv'
dotEnv.config()

//importação dos arquivos responsaveis por armazanar as rotas separadas 
import categoriesController from './categories/categoriesController.js'
import articlesController from './articles/articlesController.js'

import article from './articles/Article.js'
import category from './categories/Category.js'

const app = express()

const PORT = process.env.PORTA // variaveis de ambiente

// view-engine
app.set('view engine', 'ejs') // motor de visualização | motor de rederização 
// body-parser ==> analizador de corpo
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// arquivos staticos
app.use(express.static('public'))

// database --> verifica a conexão com o banco de dados
connection
  .authenticate()
  .then(() => { // então
    console.log('Conexão feita com sucesso!')
  })
  .catch((error) => {
    console.log({ 'error': error })
  })

// diz ao express usar as rotas exportadas  
app.use('/', categoriesController)
app.use('/', articlesController)

// rota principal
app.get('/', (request, response) => {
  response.render('index.ejs')
})

// conxão com o servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta: http://localhost:${PORT}`)
})





