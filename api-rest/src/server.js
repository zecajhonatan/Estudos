import app from './app.js'
const PORT = process.env.PORT | 3000

// escuta uma porta para dar inicio ao sevidor
app.listen(PORT, () => { 
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`)
})






