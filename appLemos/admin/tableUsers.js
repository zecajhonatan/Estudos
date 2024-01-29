import Sequelize from 'sequelize'
import connection from '../database/database.js'

let users = connection.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// users.sync({force: false})

export default users