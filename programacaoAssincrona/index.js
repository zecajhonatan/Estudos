// let de = 'Zecajhonatan'
// let para = 'zecajhonatan@gmail.com'
// let corpo = 'dados enviados por email'

// function enviarEmail(callbeck) {
//   setTimeout(() => {
//     let deuErro = true
//     if (deuErro) {
//       callbeck('O envio de email Falhou!')
//     } else {
//       callbeck()
//     }
//   }, 8000)
// }

// console.log('inicio do envio') // sincrono 
// enviarEmail((error) => {
//   if (error == undefined) {
//     console.log('Não deu erro')
//   } else {
//     console.log(error)
//   }
// }) // assincrono 


// function enviarEmail(corpo, para) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let error = true
//       console.log('E-mail enviado')
//       if (!error) {
//         resolve()
//       } else {
//         reject('não consegui fazer o que eu te prometi, Desculpe')
//       }
//     }, 2000)
//   })
// }

// enviarEmail()
//   .then(() => {
//     console.log('Voce Conseguiu fazer o que me prometeu!')
//   })
//   .catch(error => console.log(error))

// function pegarDadosBanco() {
//   return new Promise((resolve, reject) => {
//     let sql = 'SELECT * FROM table WHERE email = email;'
//     conexao.query(sql, (error, result) => {
//       if (error) reject(error)
//       return resolve(JSON.stringify(result))
//     })
//   })
// }
// pegarDadosBanco()
//   .then((result) => {
//     console.log(result)
//   })
//   .catch(error => {
//     console.log({'error:': error })
//   })























