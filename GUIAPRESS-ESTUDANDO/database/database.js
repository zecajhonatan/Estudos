import Sequelize from 'sequelize' // importa o modulo do sequelize, responsavel por fazer a conecção com o banco
import dotEnv from 'dotenv' // modulo para trabalhar com variaveis de ambiente
dotEnv.config() // necessario passar essa configuração para funcionar

const connection = new Sequelize(process.env.NOME_BANCO_DADOS, process.env.USUARIO, process.env.SENHA, {
  host: process.env.SERVIDOR,
  dialect: 'mysql',
  timezone: '-03:00' // faz com que o horario dos dados do banco, seja atualizado com o horario correto e atual local
})

connection
  .authenticate()
  .then(() => { // então
    console.log('Conexão feita com sucesso!')
  })
  .catch((error) => {
    console.log({ 'error': error })
  })

export default connection // exportação padrão




