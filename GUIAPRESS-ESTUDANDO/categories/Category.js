import Sequelize from "sequelize";
import connection from '../database/database.js'

// criação da tabela no banco de dados
const category = connection.define('categories', {
  title: {
    type: Sequelize.STRING,
    allowNull: false // não permite ter dados nulos na coluna
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// category.sync({force: false}) // sincronização 

export default category






