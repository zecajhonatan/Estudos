const token = '728152aa-0da9-4be9-bbaf-d34302213ecd'
const proxy = 'https://corsproxy.io/?' // evita que tenha erros de CORS
const botao = document.getElementById('botao')
const idPlayer = 232580 // id do jogador conforme a colocação dele na lsitagem da AE
let start = 0
let dados = JSON.stringify({ 'bid': 2200 })

function pesquisaJogador() {
  // const pricePlayer = document.getElementById('pricePlayer')
  const valorJogador = 2400
  const queryParams = { maskedDefId: idPlayer, maxb: valorJogador, num: 21, start: start }
  const queryString = new URLSearchParams(queryParams).toString()
  const url = `${proxy}https://utas.mob.v2.fut.ea.com/ut/game/fc24/transfermarket?${queryString}`

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
      // data.map(data => console.log(data.tradeId))
      let arrayJogador = data.auctionInfo
      let filtroMenorValor = arrayJogador.filter(data => data.buyNowPrice == 2100)
      let trade = filtroMenorValor.map(data => data.tradeId)

      // console.log(arrayJogador)
      console.log(filtroMenorValor)
      console.log(trade)
    })
    .catch(error => {
      console.log(error.message)
    })
}

function comprarJogador(trade) {
  const tradeId = trade
  const queryParams = { maskedDefId: idPlayer, maxb: 2100, start: start }
  const queryString = new URLSearchParams(queryParams).toString()
  const url = `https://utas.mob.v2.fut.ea.com/ut/game/fc24/trade/${tradeId}/bid?${queryString}`

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-UT-SID': token,
      'Access-Control-Allow-Origin': null,
    },
    body: JSON.stringify({ 'bid': 2200 }),
    mode: 'no-cors'
  })
    .then(data => {
      if (!data.ok) {
        throw new Error('HTTP error:' + data.status)
      }
      return data.json()
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error.message)
    })
}

botao.addEventListener('click', () => {
  if (start == 160) start = 0
  start += 20
  pesquisaJogador()
  console.log(start)
})





