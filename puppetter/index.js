import puppetter from 'puppeteer'

const url = 'https://estrelabet.com/pb/gameplay/aviator/real-game'

let start = async () => {
  const browser = await puppetter.launch({
    headless: false,
  })
  const page = await browser.newPage()
  console.log('Iniciei')
  await page.goto(url)
  console.log('Fui para a Url')

  // escrever na caixa 
  //await page.type('<seletor>', '<algo desejado>')

  // define um tempo de espera para determinada função --> valor que e passado em milissegundos
  // await page.waitForTimeout(5000)
  // clica em um botão
  await page.waitForSelector('#email')
  await page.type('#email', 'zecajhonatan@gmail.com')
  
  await page.waitForSelector('#txtPassword')
  await page.type('#txtPassword', 'Juliae090320132023')
  
  // await page.waitForSelector('button.site-btn__primary')
  await page.click('.cookie-accept .button.site-btn__primary')

  // await page.waitForSelector('#loginButton')
  await page.click('#loginButton')
  
  // await page.waitForTimeout(5000)
  // seletor.click()

  // await page.click('.first-row .buttons-block .ng-star-inserted')
  // esperar pelo seletor
  
  // await page.waitForTimeout(10000)
  // await page.close()
}

start()