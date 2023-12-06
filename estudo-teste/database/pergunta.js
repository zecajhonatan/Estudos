import Sequelize from 'sequelize'
import connection from '../database/database.js'

const Pergunta = connection.define('perguntas', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Pergunta.sync({ force: false }) // faz a sincronização com o banco de dados e verifica se existe alguma tabela com o mesmo nome
export default Pergunta