// tabela cadastro de clientes
import Sequelize from 'sequelize'
import connection from '../database/database.js'

const customer = connection.define('customer', {
  customers: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telephone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  seller: {
    type: Sequelize.STRING,
    allowNull: false
  },
  paymentMethod: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// customer.sync({force: false})
export default customer