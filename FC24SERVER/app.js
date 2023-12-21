import express from "express";
import bodyParser from 'body-parser'
let app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs') // tipo de motor de renderização

const token = 'd828bf6c-4316-40fd-b98e-68f4d54b4995'
const proxy = 'https://corsproxy.io/?' // evita que tenha erros de CORS

const idPlayer = 232580 // id do jogador conforme a colocação dele na lsitagem da AE
const valorJogador = 1800 // PREÇO JOGADOR
let start = 0

let valorCompra = JSON.stringify({ 'bid': 2200 })

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/pesquisaJogador', (req, res) => {

  start += 20
  if (start >= 160) start = 0

  const queryParams = { maskedDefId: idPlayer, maxb: valorJogador, num: 21, start: start }
  const queryString = new URLSearchParams(queryParams).toString()
  const url = `https://utas.mob.v2.fut.ea.com/ut/game/fc24/transfermarket?${queryString}`

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-UT-SID': token,
    }
  })
    .then(data => {
      if (!data.ok) {
        throw new Error('HTTP error:' + data.status)
      }
      return data.json()
    })
    .then(data => {

      let arrayJogador = data.auctionInfo
      let filtroMenorValor = arrayJogador.filter(data => data.buyNowPrice < valorJogador)

      // ordenar para que o preço mais barato aparece no topo

      filtroMenorValor.sort((a, b) => {
        if (a.buyNowPrice < b.buyNowPrice) {
          return -1
        } else {
          true
        }
      })

      let trade = filtroMenorValor.map(data => data.tradeId)
      let indentificaçãojogador = trade[0]

      let compreAgoraPreco = filtroMenorValor[0].buyNowPrice
      
      // res.send(filtroMenorValor[0]) // dados de retorno da requisição

      console.log(indentificaçãojogador)
      console.log(compreAgoraPreco)
      
      comprarJogador(indentificaçãojogador, compreAgoraPreco)
      // envia os dados para o console

    })
    .catch(error => {
      console.log(error.message)
    })
})

async function comprarJogador(trade1, compreAgoraPreco) {
  const tradeId = trade1;
  const queryParams = { maskedDefId: idPlayer, maxb: compreAgoraPreco, start: start };
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `https://utas.mob.v2.fut.ea.com/ut/game/fc24/trade/${tradeId}/bid?${queryString}`;

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-UT-SID': token
    },
    body: JSON.stringify({
      "bid": compreAgoraPreco
    }), // verificar se vai dar erro
  })
    .then(data => {
      if (!data.ok) { // Corrigido: Invertido para tratar erro
        throw new Error('HTTP error:' + data.status);
      }
      console.log('teste')
      return data.json();
    })
    .then(data => {
      console.log(data);
      console.log('COMPRA REALIZADA')
    })
    .catch(error => {
      console.log(error.message);
      console.log('ERRO NO CODIGO')
    });
}































app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta: http://localhost:${PORT}`)
})









