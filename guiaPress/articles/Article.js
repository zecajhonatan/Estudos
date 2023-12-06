let sequelize = require("sequelize"); // modulo sequelize
let connection = require("../database/database"); // conexão com o banco de dados
let Category = require("../categories/Category"); // importanto a tabela categoria para criar o relacionamento entre elas

let Article = connection.define("articles", {
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: sequelize.TEXT,
    allowNull: false,
  },
});

Category.hasMany(Article); // uma categoria (tem muitos) artigos ==> relacionamento 1 para muitos
Article.belongsTo(Category); // a tabela artigo (pertece a) tabela categoria ==> relacionamento 1 para 1

Article.sync({ force: false }); // passa esse comando para a criação da tabela no banco de dados ==> sincronização
// depois apaga

module.exports = Article;
