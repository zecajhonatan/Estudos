import express from 'express'
let app = express()
const PORT = 3000

// diz ao express que o motor de renderização do html vai ser o ejs
app.set('view engine', 'ejs')
// diz ao express que vai receber dados em formato de 'json'
app.use(express.json())

app.get('/', (req, res) => {
  res.render('cadastro')
})







app.listen(PORT, () => {
  console.log(`conexão feita com a porta:http://localhost:${PORT}`)
})








