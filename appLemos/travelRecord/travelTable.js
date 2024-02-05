// tabela cadastro de entregas
import Sequelize from 'sequelize'
import connection from '../database/database.js'

let trips = connection.define('travels', {
  cliente: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endereco: {
    type: Sequelize.STRING,
    allowNull: false
  },
  material: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantidade: {
    type: Sequelize.STRING,
    allowNull: false
  },
  precoUnitario: {
    type: Sequelize.STRING,
    allowNull: false
  },
  valorTotal: {
    type: Sequelize.STRING,
    allowNull: false
  },
  vendedor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  formaPagamento: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// trips.sync({ force: false })
export default trips

//cliente-endereco-material-quantidade-precoUnitario-valorTotal-vendedor-formaPagamento-telefone