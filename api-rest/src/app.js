import express from "express"
import routes from "./routes.js"

let app = express()

// indica para o express ler body(corpo) com formato json
app.use(express.json())

// usar routes
app.use(routes)

export default app
