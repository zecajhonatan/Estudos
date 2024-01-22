let fs = require('fs')
let ejs = require('ejs')


// COMO FAZER A LEITURA DE UM ARQUIVO DE TESTO COM METODO NATIVO DO NODE.JS
// fs.readFile('./dados.js', { encoding: 'utf8'}, (error, result) => {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log(result)
//     }
// })

// COMO ESCREVER EM UM ARQUIVO DE TEXTO COM METODO NATIVO DO NODE.JS
// fs.writeFile('./jhonatan.santos', 'Nova linha de texto, vamos para mais uma!', (error) => {
//   console.log(error)
// }) 

// function modificarDados(caminho, nome, idade, funcao) {
//   fs.readFile(caminho, { encoding: 'utf-8' }, (error, result) => {
//     if (error) {
//       console.log('Ocorreu um error!')
//     } else {
//       let conteudo = JSON.parse(result) // CONVERTE O JSON EM UM OBJETO
//       conteudo.nome = nome
//       conteudo.idade = idade
//       conteudo.trabalho = funcao
//       let resultado = JSON.stringify(conteudo) // CONVERTE OBJETO LITERAL EM UM STRING JSON
//       fs.writeFile(caminho, resultado, (error) => {
//         if (error) {
//           console.log({ "error:": error })
//         }
//       })
//     }
//   })
// }
// modificarDados('./dados.json', 'Zeca', 32, 'Empresario')




// IMPORTANDO A CLASSE CRIADA EM OUTRO ARQUIVO
let Reader = require('./Reader.js')
let Processor = require('./Processor.js')
let Table = require('./Table.js')
let HtmlParser = require('./htmlParser.js')
let Writer = require('./Writer.js')
let PDFWriter = require('./PdfWrite.js')



let leitor = new Reader() // instancia essa classe para criar um novo objeto
let escritor = new Writer()

async function main() {

  let dados = await leitor.Read('./users.csv')

  let dadosProcessados = Processor.Process(dados)

  let usuarios = new Table(dadosProcessados)
  
  let html = await HtmlParser.Parse(usuarios)

  // escritor.Write(Date.now() + ".html", html)
  PDFWriter.WritePDF(Date.now() + ".PDF", html)

  console.log(html)
}

main()




