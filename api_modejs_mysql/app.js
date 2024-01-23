let express = require('express')
let app = express()
let dotenv = require("dotenv")
dotenv.config()

let db = require("./db.js")

let PORT = process.env.PORT

app.use(express.json())

// CREATE
app.post("/customer/create", async (req, res) => {
  const customers = req.body
  let id = req.params.id
  await db.createCustomers(customers)
  res.sendStatus(201)
})

app.get("/customer/read", async (req, res) => {
  let result = await db.readCustomers()
  res.json(result)
})

app.get("/customer/select/id/:id", async (req, res) => {
  let id = req.params.id
  let results = await db.selectById(id)
  res.json(results)
})

app.put("/customer/update/:id", async (req, res) => {
  let id = parseInt(req.params.id)
  let customer = req.body
  console.log(typeof id)
  await db.update(id, customer)
  res.sendStatus(200)
})

app.delete('/customer/delete/:id', async (req, res) => {
  let id = req.params.id
  await db.deletar(id)
  res.send("Deletado")
})

app.listen(PORT, () => {
  console.log(`Servidor conectado na porta: http://localhost:${PORT}`)
})