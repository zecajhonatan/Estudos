const express = require('express')
const { createServer } = require('node:http')
const { Server } = require('socket.io')

const app = express()
const server = createServer(app)
const io = new Server(server)

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render("index")
});

let clientesConectados = []

// EVENTO DE CONEXÃO
io.on("connection", (socket) => {
  // DIZ QUE UM CLIENTE INDICADO PELO ID FOI CONECTADO
  // console.log("Cliente Conectado Id Socker " + socket.id)

  // ADICIONA OS IDS DOS CLIENTES CONECTADOS EM UM ARRAY
  clientesConectados.push(socket.id)

  // IMPRIME NO CONSOLE OS CLIENTES CONECTADOS
  console.log(clientesConectados)

  // QUANDO UM NOVO CLIENTE CONECTA ENVIA PARA O FRONTEND O ARRAY ATUALIZADO
  io.emit("clientesConectados", clientesConectados)

  // RECEBE AS MENSAGENS DO FRONDEND 
  socket.on("chatMenssage", (msg) => {
    // RETORNA AS MENSAGENS PARA O FRONDEND PARA TODOS OS CLIENTES CONECTADOS
    io.emit("chatMenssage", msg)
  })

  // RECEBE AS MENSAGENS DO FRONTEND E INDICA PARA QUAL ID ESPECIFICO DEVE RETORNAR A MESNSAGEM
  socket.on("mensagemId", (id, msg) => {
    // RETORNA A MENSAGEM PARA O ID(CLIENTE) ESPECIFICO
    io.to(id).emit("mensagemId", msg)
  })

  // FUNCAO QUE RETORNA QUAIS CLIENTES FORAM DESCONECTADOS
  socket.on("disconnect", () => {
    // IMPRIME NO CONSOLE QUAL CLIENTE FOI DESCONECTADO BASEADO NO ID
    console.log("Cliente desconectado Id Socker " + socket.id)

    // RETORNA I INDICE DO CLIENTE DENTRO DO ARRAY QUE FOI DESCONECTADO
    let index = clientesConectados.indexOf(socket.id)
    // VERIFICA SE O INDICE PESQUISADO E (NÃO IDÊNTICO A -1) --> SE FOR ENTRA NO ARRAY E EXCLUI O CLIENTE BASEADO NO INDICE
    if (index !== -1) {
      clientesConectados.splice(index, 1)
    }
    // QUANDO O CLIENTE DESCONECTA ENVIA PARA O FRONTEND O ARRAY ATUALIZADO SEM O CLIENTE 
    io.emit("clientesDesconectados", clientesConectados)
  })

})

server.listen(3000, () => {
  console.log('App rodando na porta: http://localhost:3000')
})