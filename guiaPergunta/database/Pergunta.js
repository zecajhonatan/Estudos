const sequelize = require('sequelize')
const connection = require('./database') // exportando o arquivo de conexão com o banco de dados

// gerando tabelas com model criando com codigos javascript
// estrutura de dados que representa a sua tabela
// criando uma tabela (modulo sequelize)

let pergunta = connection.define('perguntas', { // maneira para cria (TABELAS) com sequelize com codigos javascript
    titulo: {
        type: sequelize.STRING, // vai ser um texto curto
        allowNull: false // impede que esse campo receba valores nulos, nunca vai esta vazio no banco de dados
    },
    descricao: {
        type: sequelize.TEXT,  // vai ser um texto longo
        allowNull: false // impede que esse campo receba valores nulos, nunca vai esta vazio no banco de dados
    }
})
// pergunta.sync({ force: false }).then(() => { // sincronizar essa tabela com o banco dedados
//     console.log('Criado tabela Pergunta')
// })
module.exports = pergunta






