let sequelize = require('sequelize') 
let connection = require('../database/database') // importação modulo/ tabela

// criação da tabela categorias
let Category = connection.define('categories', {
  title: {
    type: sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: sequelize.STRING,
    allowNull: false
  }
})

Category.sync({force: false}) // passa esse comando para a criação da tabela no banco de dados
// depois apaga para nao continuar criando tabelas a cada vez que o sistema for atualizado
module.exports = Category







