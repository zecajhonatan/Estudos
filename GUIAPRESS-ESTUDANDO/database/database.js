import Sequelize from 'sequelize'
import dotEnv from 'dotenv' // modulo para trabalhar com variaveis de ambiente
dotEnv.config()

const connection = new Sequelize(process.env.NOME_BANCO_DADOS, process.env.USUARIO, process.env.SENHA, {
  host: process.env.SERVIDOR,
  dialect: 'mysql',
  timezone: '-03:00'
})

export default connection // exportação padrao

// instalo a dependencia do pacote sequelize na pasta raiz do projeto com o comando (npm install sequelize --save)
// crio uma pasta com o nome database
// dentro da pasta database crio um arquivo com o nome database.js

// entro no arquivo e faço a importação do (pacote | dependencia | modulo) no sequelize ==> import Sequelize from 'sequelize'
// crio uma variavel  com o nome connection que vai receber um novo objeto com o comando (new Sequelize())
// esse obejto vai receber alguns parametros
// primeiro (nome do banco de dados)
// segundo (usuario ==> padrão (root))
// terceiro (senha que e cadastrada na criação do banco de dados)
// quarto (um objeto json que recebe dois parametros ==> 
  // primeiro (host: ''localhost) --> hospedagem
  // segundo (dialect: 'mysql') --> conversa entre o banco de dados e a aplicação
//) 

// faço a exportacao da variavel


 