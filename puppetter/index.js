import puppetter from 'puppeteer'

const url = 'https://estrelabet.com/pb/gameplay/aviator/real-game'

let start = async () => {
  const browser = await puppetter.launch({
    headless: false,
  })
  const page = await browser.newPage()

  await page.setViewport({
    width: 1024,
    height: 650,
  })

  console.log('Iniciei')
  await page.goto(url)

  console.log('Fui para a Url')

  // escrever na caixa 
  // await page.type('<seletor>', '<algo desejado>')

  // define um tempo de espera para determinada função --> valor que e passado em milissegundos
  // await page.waitForTimeout(5000)
  // clica em um botão
  await page.waitForSelector('#email')
  await page.type('#email', 'zecajhonatan@gmail.com', {
    delay: 50
  })

  await page.waitForSelector('#txtPassword')
  await page.type('#txtPassword', 'Juliae090320132023', {
    delay: 50
  })

  await page.waitForSelector('app-cookie-policy .site-btn__primary')
  await page.click('app-cookie-policy .site-btn__primary')

  let button = await page.waitForXPath('/html/body/modal[2]/div/div/div/div/app-loginform/div/div[4]/div/div/div[3]/form/div[4]/button[1]')
  console.log('teste  ' + button)
  await button.click()

  await new Promise(r => setTimeout(r, 5000))

  let full = await page.$('i.icon-fullscreen')
  console.log('teste  ' + full)
  await full.click()

  // $('app-bet-controls .controls')

  await new Promise(r => setTimeout(r, 5000))

  try {
    await page.waitForSelector('#gamePlayIframe')
    let t = await page.$('app-bet-control.bet-control')
    console.log('teste botao  ' + t)
  } catch (error) {
    console.log('Não encontrou a tag')
  }



  // await new Promise(r => setTimeout(r, 5000))
  // let div = await page.waitForXPath('/html/body/app-root/app-game/div/div[1]/div[2]/div/div[2]/div[3]/app-bet-controls/div/app-bet-control[1]')
  // await page.waitForSelector(div, {timeout: 6000})
  // // await new Promise(r => setTimeout(r, 5000))
  // console.log('teste botao' + div)



  // await Promise.all([
  //   page.waitForNavigation(),
  //   console.log(verificacao)
  // ])






  // await page.waitForSelector('/html/body/app-root/app-game/div/div[1]/div[2]/div/div[2]/div[3]/app-bet-controls/div/app-bet-control[1]/div/div[1]/div[2]/button')
  // let button = await page.$('/html/body/app-root/app-game/div/div[1]/div[2]/div/div[2]/div[3]/app-bet-controls/div/app-bet-control[1]/div/div[1]/div[2]/button')
  // console.log(button)

  // await page.waitForSelector('#loginButton')


  // let cliqueElemnto = await page.waitForXPath('/html/body/app-root/app-game/div/div[1]/div[2]/div/div[2]/div[3]/app-bet-controls/div/app-bet-control[1]/div/div[1]/div[2]/button')
  // await page.waitForSelector(cliqueElemnto)
  // console.log(cliqueElemnto)
  // cliqueElemnto.click()

  // let seletor = await page.$$eval('button', item => item.map( item => item.innerText))
  // console.log(seletor)






  // let seletor = await page.$$('div .controls div:nth-child(2).buttons-block button')
  // console.log(seletor)

  // await page.waitForSelector('.bet-controls > app-bet-controls .double-bet .controls .first-row .buttons-block button')
  // await page.click('.bet-controls > app-bet-controls .double-bet .controls .first-row .buttons-block button')

  // await page.waitForTimeout(5000)
  // seletor.click()

  // await page.click('.first-row .buttons-block .ng-star-inserted')
  // esperar pelo seletor

  // await page.waitForTimeout(10000)
  // await page.close()
}

start()








// seleciona o primeiro filho --> QUE SEJA BASEADO NO SELETOR CORRESPONDENTE
// <seletor>:first-child {}

// seleciona o ultimo filho
// <seletor>:last-child {}

// seleciona um determinado elemento passando uma numeração
// <seletor>:nth-child(3) {}

// a palavra (odd) seleciona todos os elementos impares
// <seletor>:nth-child(odd) {}

// a palavra (even) seleciona todos os elementos pares
// <seletor>:nth-child(even) {}

// seleciona o primeiro paragrafo
// <seletor>:nth-of-type(1)

