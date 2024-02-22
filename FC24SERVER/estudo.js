// let janela


// function abrirJanela() {
//   janela = window.open('teste.html', '_blank', 'top=200, left=300, width=600, height=400')
// }

// function fecharJanela() {
//   janela = window.close()
// }

let retorPorcentagem = (valor, porcentagem) => {
  let resultado = porcentagem * valor / 100
  return resultado
}

let retornaValor_MenosPorcentagem = (valor, porcentagem) => {
  let resultado = porcentagem * valor / 100
  let valorNegativo = valor - resultado
  return valorNegativo
}

let valor = retornaValor_MenosPorcentagem(4700, 5)

console.log(valor)

[
  {
    "tradeId": 528037876430,
    "itemData": {
      "id": 252212299468,
      "timestamp": 1708342487,
      "formation": "f3412",
      "untradeable": false,
      "assetId": 232580,
      "rating": 84,
      "itemType": "player",
      "resourceId": 232580,
      "owners": 1,
      "discardValue": 596,
      "itemState": "forSale",
      "cardsubtypeid": 1,
      "lastSalePrice": 0,
      "injuryType": "none",
      "injuryGames": 0,
      "preferredPosition": "CB",
      "contract": 7,
      "teamid": 1,
      "rareflag": 1,
      "playStyle": 250,
      "leagueId": 13,
      "assists": 0,
      "lifetimeAssists": 0,
      "loyaltyBonus": 1,
      "pile": 5,
      "nation": 54,
      "resourceGameYear": 2024,
      "guidAssetId": "d72ea6e2-b79a-4206-b806-a2bebf1bcde1",
      "groups": [
        4
      ],
      "attributeArray": [
        70,
        41,
        62,
        60,
        85,
        82
      ],
      "statsArray": [
        0,
        0,
        0,
        0,
        0
      ],
      "lifetimeStatsArray": [
        0,
        0,
        0,
        0,
        0
      ],
      "skillmoves": 1,
      "weakfootabilitytypecode": 2,
      "attackingworkrate": 0,
      "defensiveworkrate": 2,
      "preferredfoot": 2,
      "possiblePositions": [
        "CB"
      ],
      "gender": 0,
      "baseTraits": [
        15,
        27
      ],
      "iconTraits": [

      ]
    },
    "tradeState": "active",
    "buyNowPrice": 2500,
    "currentBid": 0,
    "offers": 0,
    "watched": false,
    "bidState": "none",
    "startingBid": 2400,
    "confidenceValue": 100,
    "expires": 3438,
    "sellerName": "FIFA UT",
    "sellerEstablished": 0,
    "sellerId": 0,
    "tradeOwner": false,
    "tradeIdStr": "528037876430"
  }
]





