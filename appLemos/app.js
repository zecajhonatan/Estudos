import express from 'express'
import bodyParser from 'body-parser'
import connection from './database/database.js'

let app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

import CustomerRouteControle from './customerBase/customerRouteControl.js'
app.use('/', CustomerRouteControle)

// diz ao express que o motor de renderização do html vai ser o ejs
app.set('view engine', 'ejs')
// diz ao express que vai receber dados em formato de 'json'
app.use(express.json())

// ROTA PRINCIPAL
app.get('/', (req, res) => {
  res.render('./customer/customerList.ejs')
})

app.post('/buscarDados', (req, res) => {
  let dados = req.body
  res.json(dados)
})







app.listen(PORT, () => {
  console.log(`conexão feita com a porta:http://localhost:${PORT}`)
})








