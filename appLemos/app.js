import express from 'express'
import bodyParser from 'body-parser'
let app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// diz ao express que o motor de renderização do html vai ser o ejs
app.set('view engine', 'ejs')
// diz ao express que vai receber dados em formato de 'json'
app.use(express.json())

// ROTA PRINCIPAL
app.get('/', (req, res) => {
  res.render('cadastro')
})

app.post('/buscarDados', (req, _) => {
  let dados = req.body
  console.log(dados)
})







app.listen(PORT, () => {
  console.log(`conexão feita com a porta:http://localhost:${PORT}`)
})








