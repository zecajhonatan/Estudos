const sequelize = require('sequelize') // buscar o pacode do sequilize
const connection = new sequelize('guia_perguntas', 'root', 'Juliae090320132023', { // comando necessario para conectar com o banco de dados 
    host: 'localhost', // o servidor que esta rodando
    dialect: 'mysql' // qual o tipo de banco de dados queremos rodar
})

module.exports = connection




