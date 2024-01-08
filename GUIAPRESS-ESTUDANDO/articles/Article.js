import Sequelize from 'sequelize'
import connection from '../database/database.js'
// tabela de categorias para fazer o relacionamento entre elas
import category from '../categories/Category.js'

// criação de tabela no banco de dados
const article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

// relacionamento entre tabelas
category.hasMany(article) // a tabela categoria (tem muitos) tabela artigos
article.belongsTo(category) // a tabela artigo (pertence a) tabela categoria

// article.sync({force: false})

export default article