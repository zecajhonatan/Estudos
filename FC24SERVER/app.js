import express from "express";
import bodyParser from 'body-parser'
let app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs') // tipo de motor de renderização

const token = '5052acf7-3e3d-4bb5-ada6-f6ebaf4468d8'
const proxy = 'https://corsproxy.io/?' // evita que tenha erros de CORS

const idPlayer = 232580 // id do jogador conforme a colocação dele na lsitagem da AE
const valorJogador = 2300 // PREÇO JOGADOR
const precoBase = 2000 // PRECO A BAIXO
let start = 0

// ROTA BASE URL
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// ROTA PESQUISAR MENOR PREÇO DE UM JOGADOR
app.get('/pesquisaMenorPrecoJogador', (req, res) => {

  start += 20
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

      let arrayTodosJogadores = data.auctionInfo // ARRAY
      let menorPrecoEncontrado = arrayTodosJogadores.filter(data => data.buyNowPrice < precoBase)


      if (arrayTodosJogadores.length == 21) {
        console.log('Promixo tem mais um')
        console.log(arrayTodosJogadores.length + ' arrayTodosJogadores')
        console.log('---------------------')
        console.log(menorPrecoEncontrado.length + ' menorPrecoEncontrado')
        console.log('---------------------')
      } else {
        console.log('Promixo esse ponto acabou')
        console.log(arrayTodosJogadores.length + ' arrayTodosJogadores')
      }
      // console.log(menorPrecoEncontrado)
      // menorPrecoEncontrado.push(menorPrecoEncontrado)
      // ORDENAR PARA QUE O PRECO MAIS BARATO APARACE NO TODO DO ARRAY


      // console.log(menorPrecoEncontrado.length)



      // let trade = menorPrecoEncontrado.map(data => data.tradeId)
      // let idPrimeiroJogadorArray = trade[0]
      // let PrecoComprarAgoraPrimeiroJogador = menorPrecoEncontrado[0].buyNowPrice
      // let primeiroJogadorArray = menorPrecoEncontrado[0]




      // res.send(menorPrecoEncontrado) // dados de retorno da requisição
      // console.log(idPrimeiroJogadorArray)
      // console.log(PrecoComprarAgoraPrimeiroJogador)


      // FUNCAO PARA COMPRA DE JOGADOR
      // comprarJogador(idPrimeiroJogadorArray, PrecoComprarAgoraPrimeiroJogador)

    })
    .catch(error => {
      console.log(error.message)
    })
})

async function comprarJogador(trade1, PrecoComprarAgoraPrimeiroJogador) {

  const tradeId = trade1;
  const queryParams = { maskedDefId: idPlayer, maxb: PrecoComprarAgoraPrimeiroJogador, start: start };
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `https://utas.mob.v2.fut.ea.com/ut/game/fc24/trade/${tradeId}/bid?${queryString}`;

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-UT-SID': token
    },
    body: JSON.stringify({
      "bid": PrecoComprarAgoraPrimeiroJogador
    })
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


app.get('/buscarJogadorParaListar', async (req, res) => {

  const url = 'https://utas.mob.v2.fut.ea.com/ut/game/fc24/squad/active'

  await fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'X-UT-SID': token
    }
  })
    .then(data => {
      if (!data.ok) {
        throw new Error('http error: ' + data.status)
      }
      return data.json()
    })
    .then(data => {

      res.send(data)

      console.log(data)
    })
    .catch(error => {
      console.log(error.message)
    })
})































app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta: http://localhost:${PORT}`)
})









