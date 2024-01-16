import express from "express"; // pacote ou modulo
const app = express()

// tabelas criadas no banco de dados
import Article from './articles/Article.js'
import Category from './categories/Category.js'
import User from './user/user.js'
import session from 'express-session'

app.use(session({
  secret: 'admin',
  cookie: {
    maxAge: 3000000 // tempo limite para que os dados da sessão expire --> e passado em milisegundos
  }
}))

// para usar as variaveis de ambiente
import dotEnv from 'dotenv'
dotEnv.config()

const PORT = process.env.PORTA

// body-parser ==> analizador de corpo, responsavel por buscar dados nos formularios
import bodyParser from 'body-parser' // buscar dados no front-end
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//importação dos arquivos responsaveis por armazenar as rotas separadas em outros arquivos
import categoriesController from './categories/categoriesController.js'
import articlesController from './articles/articlesController.js'
import usersController from './user/usersController.js'

// diz ao express usar as rotas importadas  
app.use('/', categoriesController)
app.use('/', articlesController)
app.use('/', usersController)

// view-engine
// motor de visualização | motor de rederização das viwes
app.set('view engine', 'ejs')

// diz ao express usar os arquivos estaticos
app.use(express.static('public'))

// rota responsavel por criar as sessões que são relacionadas ao cookes
/* app.get('/session', (req, res) => {
  req.session.treinamento = 'Formação node.js'
  req.session.ano = 2024
  req.session.email = 'zecajhonatan@gmail.com'
  req.session.user = {
    username: 'zecajhonatan',
    email: 'zecajhonatan@gmail.com',
    id: 10
  }
  res.send('Sessão gerada!!!')
}) */

// rota responsavel por ler as sessões que são relacionadas ao cookes
/* app.get('/leitura', (req, res) => {
  res.json({
    treinamento: req.session.treinamento,
    ano: req.session.ano,
    email: req.session.email,
    user: req.session.user,
  })
}) */

// rota principal do app
app.get('/', (req, res) => {
  Article.findAll({ // tabela de artigos
    limit: 4,
    order: [['id', 'DESC']]
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render('index.ejs', {
        articles: articles,
        categories: categories
      })
    })
  })
})

// roda que renderiza os artigos
app.get('/:slug', (req, res) => {
  let slug = req.params.slug
  Article.findOne({ // encontre um
    where: {
      slug: slug
    }
  }).then(article => {
    if (article != undefined) {
      Category.findAll().then(categories => {
        res.render('article.ejs', {
          article: article,
          categories: categories
        })
      })
    } else {
      res.redirect('/')
    }
  }).catch(error => {
    res.redirect('/')
  })
})

// rota que busca a categoria com todos os artigos relacionados a ela
app.get('/category/:slug', (req, res) => {
  let slug = req.params.slug
  Category.findOne({
    where: { slug: slug },
    include: [{ model: Article }]
  }).then(category => {
    if (category != undefined) {
      Category.findAll().then(categories => {
        res.render('index.ejs', {
          articles: category.articles,
          categories: categories
        })
      })
    } else {
      res.redirect('/')
    }
  }).catch(error => {
    res.redirect('/')
  })
})

// conexão com o servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando na porta: http://localhost:${PORT}`)
})








