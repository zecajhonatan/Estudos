import Sequelize from "sequelize";
import connection from '../database/database.js'

// criação da tabela no banco de dados
const User = connection.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false // não permite ter dados nulos na coluna
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// User.sync({force: false}) // sincronização --> responsavel por criar o model/tabela no banco
export default User