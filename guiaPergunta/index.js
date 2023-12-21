// nesse projeto vai ser utilizado 3 tecnologias 
// (express) framework que trabalha com o node
// (mysql) sistema de gerenciamento de banco de dados relacional (RDBMS)
// (ejs) para utilizar html no node ==> https://ejs.co/
// ejs ==> e um motor de templetes, a função dele e desenha/renderizar/exibir o html para o usuario na tela  

// CONFIGURANDO E EXIBINDO EJS NA TELA 
// EXIBINDO VARIAVEIS NO HTML COM EJS
// EXTRUTURAS CONDICIONAIS COM EJS
// ESTRUTURA DE REPETIÇÃO COM EJS ==> (FOREACH)
// ARQUIVOS ESTATICOS
// CAPTURANDO DADOS DE UM FORMULARIO

// MySQL Workbench ==> ferramenta que facilita trabalhar com o mysql sem precisar utilizar comandos ==> https://dev.mysql.com/downloads/file/?id=517975 (para baixar)
// sequelize ==> comandos para ficar mais facil o manuzeio dos codigos mysql ==> https://sequelize.org/ (para baixar)
// COMANDOS PARA INSTALAÇÃO BIBLITECA SEQUELIZE
// npm install --save sequelize
// npm install --save mysql2

// (npm init) ==> inicia um projeto node/npm na pasta desejada
// (npm install express --save) ==> instala todo pacote express na pasta do projeto 

// instalar EJS ==> (npm install ejs)
// instalar nodemon ==> (npm install -g nodemon --save)

const express = require('express') // importanto um modulo de express
const app = express() // craindo uma instancia(objeto) do modulo express
const bodyParser = require('body-parser') // ==> (analizar corpo) ==> importando a biblioteca do express
// para receber dados de um formulario e preciso intalar uma biblioteca do express (body-parser)
// npm install body-parser --save ==> comando para instalar essa biblioteca
// e responsavel por traduzir os dados enviados pelo formulario em uma estrutura javascript que conseguimos utilizar no back-end
const connection = require('./database/database'); // importanto a conexão com o banco de dados

const Pergunta = require('./database/Pergunta'); // importanto a tabela de Pergunta criada com model
const Resposta = require('./database/Resposta'); // importanto a tabela de Resposta criada com model


const PORT = 3000
// database
connection // faz a autenticação para verificar se esta conectado no banco de dados
    .authenticate()
    .then(() => {
        console.log('Conexão feita com banco de dados')
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

// EXPRESS usar o EJS como view engine(tradução == ver motor )
app.set('view engine', 'ejs') // nesse comando começo a utilizar o ejs com o express ==> para renderizar o html no meu projeto ==> preciso desse comando para trabalhar juntos  
app.use(express.static('public')) // comando para fazer que o codigo leia os arquivos de css/img
app.use(bodyParser.urlencoded({ extended: false })) // esse comando vai traduzir os dados de entrada em uma estrutura javascript para que consiga usar dentro do back-end 
app.use(bodyParser.json()); // esse comando vai permitir a leitura de dados que forem enviados como (JSON) 

app.get('/', function (req, res) {
    Pergunta.findAll({ raw: true, order: [['id', 'DESC']] }).then(pergunta => { // comando reponsavel por procurar todas as perguntas na tabela e retornar 
        res.render('index', { // ASC ==> crescente | DESC ==> decrescente  // organiza a ordem da busca
            perguntas: pergunta,
        })
    })
})

app.get('/perguntar', function (req, res) {
    res.render('perguntar') // ==> reposnsavel por renderezar as paginas na tela
})

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id

    Pergunta.findOne({ // esse e um metodo do sequelize que vai no banco de dados e busca um dado com uma (condicao)
        where: { id: id } // where ==> entao | como
    }).then((pergunta) => {

        if (pergunta != undefined) { // esta verificando se a pergunta foi encontrada

            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta, // a pergunta com o id especifico
                    respostas: respostas, // grupo de respostas em um array
                })
            })

        } else {
            res.redirect('/') // se a pergunta não foi encontrada vai redirecionar para a pagina principal
        }
    })
})

app.post('/salvarPergunta', function (req, res) { // rota para receber os dados do formulario

    let titulo = req.body.titulo; // recebendo os dados do formulario
    let descricao = req.body.descricao; // recebendo os dados do formulario

    Pergunta.create({ // metodo create() ==> responsavel por salvar uma pergunta no banco de dados
        titulo: titulo,
        descricao: descricao,
    }).then(() => {
        res.redirect('/') // comando responsavel por direcionar para pagina desejada
    })
    // res.send('Formulario recebido:  Titulo:' + titulo + ' ' + 'Descrição:' + descricao)
})

app.post('/responder', (req, res) => { // rota para receber os dados do formulario
    let corpo = req.body.corpo
    let perguntaId = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId,
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId)
    })
})

app.listen(PORT, function (error) { // foi criado um servidor local PARA RODAR localhost:8080/<rotas>
    if (error) {
        console.log({ 'error': error })
    } else {
        console.log(`Servidor rodando na porta: http://localhost${PORT}`)
    }
})
































