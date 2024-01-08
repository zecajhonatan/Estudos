let sequelize = require('sequelize') // importar o sequelize
let connection = require('./database') // importação com o banco de dados

let Resposta = connection.define('respostas', { // maneira de criar uma tabela
    corpo: {
        type: sequelize.TEXT,
        allowNull: false,
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false,
    }
})

// Resposta.sync({ force: false }).then(() => {
//     console.log('Criado tabela de Pergunta')
// }) // sincronizar essa tabela com o banco dedados
module.exports = Resposta


