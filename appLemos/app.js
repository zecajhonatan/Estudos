import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session' // NPM INSTALL --SAVE EXPRESS-SESSION
import connection from './database/database.js'

let app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

import CustomerRouteControle from './customerBase/customerRouteControl.js'
import Users from './admin/users.js'
app.use('/', CustomerRouteControle)
app.use('/', Users)

app.use(session({
  secret: 'admin',
  cookie: {
    maxAge: 60000,
  }
}))

// diz ao express que o motor de renderização do html vai ser o ejs
app.set('view engine', 'ejs')
// diz ao express que vai receber dados em formato de 'json'
app.use(express.json())

app.get('/', (req, res) => {
  res.redirect('customer/list')
})

app.post('/buscarDados', (req, res) => {
  let dados = req.body
  res.json(dados)
})

app.listen(PORT, () => {
  console.log(`conexão feita com a porta:http://localhost:${PORT}`)
})








