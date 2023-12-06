let Sequelize = require('sequelize') // importando modulo sequelize

let connection = new Sequelize('guiapress', 'root', '123456', { // criando um objeto de conexão com o banco de dados
    host: 'localhost',
    dialect: 'mysql'
})
module.exports = connection




 





