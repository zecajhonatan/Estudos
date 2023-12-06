import app from './app.js'
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Conexão feita na porta: http://localhost:${PORT}`)
})