// programação (sincrona) --> onde cada instrução, função desejada vai ser executada por vez 


// CODIGO ASSINCRONO SENDO CONSTRUIDO COM CALLBACKS

// let de = 'Zecajhonatan'
// let para = 'zecajhonatan@gmail.com'
// let corpo = 'dados enviados para o email'

// function enviarEmail(callback) {
//   setTimeout(() => {
//     let deuErro = false
//     if (deuErro) {
//       callback("o envio do E-mail falhou!")
//     } else {
//       callback()
//     }
//   }, 3000)
// }

// function callback(error) {
//   if (error == undefined) {
//     console.log("Tudo OK")
//   } else {
//     console.log("Deu Erro: " + error)
//   }
// }

// console.log("Inicio do envio") // SINCRONO
// enviarEmail(callback) // ASSINCRONO

// ----------------------------------------------------------------

// CODIGO ASSINCRONO SENDO CONSTRUIDO COM PROMISE

// function pegarId() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("Pegou o ID")
//       resolve(5)
//     }, 2000)
//   })
// }

// function buscarEmailBanco(id) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("Pegou o E-mail")
//       resolve("zecajhonatan@gmail.com")
//     }, 2000)
//   })
// }

// function enviarEmail(email) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let error = false
//       if (!error) {
//         resolve("E-mail enviado")
//       } else {
//         reject('não consegui fazer o que eu te prometi, Desculpe')
//       }
//     }, 2000)
//   })
// }

// console.log("Inicio")
// pegarId().then((id) => {
//   buscarEmailBanco(id).then((email) => {
//     enviarEmail(email).then((msg) => {
//       console.log(msg)
//       console.log(email)
//       console.log("E-mail enviado para o cliente com o id: " + id)
//     }).catch((error) => {
//       console.log(error);
//     })
//   })
// })

// async function update() {
//   let id = await pegarId()
//   let email = await buscarEmailBanco(id)
//   try {
//    await enviarEmail(email)
//     console.log("Email enviado com sucesso!!!")
//   } catch (error) {
//     console.log(error);
//   }
// }

// update()

// console.log("Fim")

// ----------------------------------------------------------------

// CODIGO ASSINCRONO SENDO CONSTRUIDO COM ASYNC / AWAIT

// let usuarios = {
//   usuario1: "Jose",
//   usuario2: "João",
//   usuario3: "Jhonatan"
// }

// function pegarUsuarios() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let certo = true
//       if (certo) {
//         resolve(usuarios)
//       } else {
//         reject("Não conseguiu buscar os usuarios!")
//       }
//     }, 3000)
//   })
// }


// async function dados() {
//   let dado = await pegarUsuarios()
//   console.log(dado);
// }

// dados()























