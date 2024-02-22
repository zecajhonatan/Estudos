import express from "express";
import bodyParser from 'body-parser'
let app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs') // tipo de motor de renderização

const token = 'a0469660-7f65-43de-a4e6-701f15c065c3'
const proxy = 'https://corsproxy.io/?' // evita que tenha erros de CORS

const idPlayer = 232580 // id do jogador conforme a colocação dele na listagem da AE
const compraJaMin = 2000
const compraJaMax = 2500


let retornaValor_MenosPorcentagem = (valor, porcentagem) => {
  let resultado = porcentagem * valor / 100
  let valorMenor = valor - resultado
  return valorMenor
}

let start = 0

// ROTA BASE URL
app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/teste', (req, res) => {
  res.redirect('/pesquisaMenorPrecoJogador')
})

// ROTA PESQUISAR MENOR PREÇO DE UM JOGADOR
app.get('/pesquisaMenorPrecoJogador', async (req, res) => {

  let trade
  let PrecoComprarAgoraPrimeiroJogador

  const queryParams = { maskedDefId: idPlayer, type: 'player', minb: compraJaMin, maxb: compraJaMax, num: 21, start: start }
  const queryString = new URLSearchParams(queryParams).toString()
  const url = `https://utas.mob.v2.fut.ea.com/ut/game/fc24/transfermarket?${queryString}`
  // start += 20

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-UT-SID': token
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
      
      let menorPrecoEncontrado = arrayTodosJogadores.filter(data => data.buyNowPrice <= retornaValor_MenosPorcentagem(compraJaMax, 10))
      res.json(menorPrecoEncontrado)


      // if (menorPrecoEncontrado != '') {
      //   trade = menorPrecoEncontrado.map(data => data.tradeId)
      //   let tradePrimeiro = trade[0]
      //   PrecoComprarAgoraPrimeiroJogador = menorPrecoEncontrado.map(data => data.buyNowPrice)
      //   let precoPrimeiro = PrecoComprarAgoraPrimeiroJogador[0]
      //   comprarJogador(tradePrimeiro, precoPrimeiro)

      //   // trade.forEach(tradeId => {
      //   //   PrecoComprarAgoraPrimeiroJogador.forEach(preco => {

      //   //   })
      //   // })

      // } else {
      //   console.log('Não existem Valores definidos')
      // }

      // if (arrayTodosJogadores.length == 21) {
      //   console.log(start)
      //   console.log('---------------------')
      //   console.log('arrayTodosJogadores ' + arrayTodosJogadores.length)
      //   console.log('menorPrecoEncontrado ' + menorPrecoEncontrado.length)
      //   console.log('PrecoComprarAgoraPrimeiroJogador' + PrecoComprarAgoraPrimeiroJogador)
      //   console.log('idPrimeiroJogadorArray ' + trade)
      //   console.log('---------------------')

      //   setTimeout(() => {
      //     res.redirect('/pesquisaMenorPrecoJogador')
      //   }, 2000)

      // } else if (arrayTodosJogadores.length < 21) {
      //   start = 0
      //   console.log('x-x-x-x-x-x-x-x-x-x-x-x-x-x-x')
      //   console.log('---------------------')
      //   console.log('Ultima Pagina')
      //   console.log('---------------------')
      //   console.log('arrayTodosJogadores ' + arrayTodosJogadores.length)
      //   console.log('menorPrecoEncontrado ' + menorPrecoEncontrado.length)
      //   console.log('PrecoComprarAgoraPrimeiroJogador ' + PrecoComprarAgoraPrimeiroJogador)
      //   console.log('idPrimeiroJogadorArray ' + trade)
      //   console.log('---------------------')

      //   setTimeout(() => {
      //     res.redirect('/pesquisaMenorPrecoJogador')
      //   }, 2000)

      // } else {

      // }

    })
    .catch(error => {
      console.log(error.message)
    })

})

let calcularPorcentagem = (porcentagem, valor) => {
  let resultado = porcentagem * valor / 100
  return resultado
}

function comprarJogador(trade1, PrecoComprarAgoraPrimeiroJogador) {

  const tradeId = trade1;
  const queryParams = { maskedDefId: idPlayer, maxb: PrecoComprarAgoraPrimeiroJogador, start: start };
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `https://utas.mob.v2.fut.ea.com/ut/game/fc24/trade/${tradeId}/bid?${queryString}`;

  fetch(url, {
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


// https://utas.mob.v2.fut.ea.com/ut/game/fc24/transfermarket? num=21 & start=0 & type=player & maskedDefId=237679 & macr=3500 & maxb=4000
app.get('/buscarJogadorParaLance', async (req, res) => {

  let idPlayer = 237679
  let precoCompraAgora = 0
  let precoLanceInicial = 3000
  let precoLanceFinal = 4000

  let quaryParams = { maskedDefId: idPlayer, start: 0, type: 'player', micr: precoLanceInicial, macr: precoLanceFinal, maxb: precoCompraAgora }
  let queryString = new URLSearchParams(quaryParams).toString()

  const url = `${proxy}https://utas.mob.v2.fut.ea.com/ut/game/fc24/transfermarket?${queryString}`

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

    })
    .catch(error => {
      console.log(error.message)
    })
})




// BUSCAR JOGADOR NO FUTBIN
app.get('/buscarJogadorFutbin', async (req, res) => {

  let idPlayer = 243715
  let queryParams = { player: idPlayer }
  let stringParans = new URLSearchParams(queryParams)
  let url = `https://www.futbin.com/24/playerPrices?${stringParans}`
  console.log(url)
  res.send(JSON.stringify(url))

})








app.get('/pesquisaJogadorPeloPreco', async (req, res) => {

  let start = 0

  let idPlayer = 237679
  let precoCompraAgora = 5000

  const queryParams = { maskedDefId: idPlayer, maxb: precoCompraAgora, start: start }
  const queryString = new URLSearchParams(queryParams).toString()
  const url = `https://utas.mob.v2.fut.ea.com/ut/game/fc24/transfermarket?${queryString}`
  // start += 20

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-UT-SID': token
    }
  })
    .then(data => {
      if (!data.ok) {
        throw new Error('HTTP error:' + data.status)
      }
      return data.json()
    })
    .then(data => {

      let arrayTodosJogadores = data.auctionInfo

      let ordenadoCompraJa = arrayTodosJogadores.sort(function (a, b) {
        if (a.buyNowPrice < b.buyNowPrice) { // ORDENADO PELO PRECO DE COMPRA JA
          return -1
        } else {
          return true
        }
      })

      let ordenadolanceInicial = arrayTodosJogadores.sort(function (a, b) {
        if (a.startingBid < b.startingBid) { // ORDENADO PELO LACE INICIAL
          return -1
        } else {
          return true
        }
      })

      let ordenarTempoRestante = arrayTodosJogadores.sort(function (a, b) {
        if (a.expires < b.expires) { // ORDENADO PELO LACE INICIAL
          return -1
        } else {
          return true
        }
      })

      // porcentagem * valor / 100
      let dados = ordenarTempoRestante.map(data => data.expires)
      let arredondarDecimais = dados.map(data => data.toFixed(1))

      res.send(arredondarDecimais)
    })
    .catch(error => {
      console.log(error.message)
    })
})






























app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta: http://localhost:${PORT}`)
})









