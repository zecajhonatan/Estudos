import express from 'express'
let router = express.Router()
import tableCategories from '../categories/Category.js' // tabela de categorias
import tableArticles from './Article.js' // tabela de artigos
import slugify from 'slugify'
import adminAuth from '../midllewares/adminAuth.js'

// rota responsavel por renderizar os artigos na tela
router.get('/admin/articles', adminAuth, (req, res) => {
  tableArticles.findAll({
    include: [{ model: tableCategories }]
  }).then(article => {
    res.render('admin/articles/index.ejs', {
      articles: article
    })
  })
})

// rota responsavel por criar um novo artigo
router.get('/admin/articles/new', adminAuth, (req, res) => {
  tableCategories.findAll().then(categories => {
    res.render('admin/articles/new.ejs', {
      categories: categories
    })
  })
})

// rota responsavel por salvar os dados no banco de dados
router.post('/articles/save',adminAuth, (req, res) => {
  let title = req.body.title
  let body = req.body.body
  let category = req.body.category
  tableArticles.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category
  }).then(() => {
    res.redirect('/admin/articles')
  })
})

// rota responsavel por editar os dados no banco de dados
router.get('/admin/articles/edit/:id',adminAuth, (req, res) => {
  let id = req.params.id
  if (isNaN(id)) { // VERIFICA SE NÃO E UM NUMERO
    res.redirect('admin/index.ejs')
  }
  tableArticles.findByPk(id).then(article => {
    if (article != undefined) {
      tableCategories.findAll().then(categories => {
        res.render('admin/articles/edit.ejs', {
          article: article,
          categories: categories
        })
      })
    } else {
      res.render('/')
    }
  }).catch(erro => {
    res.redirect('/')
  })
})

// rota responsavel por atualizar os dados no banco de dados
router.post('/articles/updade',adminAuth, (req, res) => {
  let id = req.body.id
  let title = req.body.title
  let body = req.body.body
  let category = req.body.categories
  tableArticles.update({
    title: title,
    category: category,
    body: body,
    categoryId: category,
    slug: slugify(title)
  }, {
    where: { id: id }
  }).then(() => {
    res.redirect('/admin/articles')
  }).catch(error => {
    res.redirect('/')
  })
})

// rota responsavel por deletar os artigos no banco de dados
router.post('/articles/delete',adminAuth, (req, res) => {
  let id = req.body.id
  if (id != undefined) { // verifica se e null
    if (!isNaN(id)) { // verifica se e um numero
      tableArticles.destroy({
        where: {
          id: id
        }
      }).then(() => { // então
        res.redirect('/admin/articles')
      })
    } else {
      res.render('/admin/articles')
    }
  } else {
    res.redirect('/admin/articles')
  }
})

// rota responsavel pela paginação de todos os artigos nas páginas
router.get('/articles/page/:num',adminAuth, (req, res) => {
  let page = req.params.num
  let offset = 0
  if (isNaN(page) || page == 1) {
    offset = 0
  } else {
    offset = (parseInt(page) - 1) * 4
  }
  // retorna todos os elementos da tabela no banco de dados e a quantidade de elementos existentes nessa tabela
  tableArticles.findAndCountAll({ // encontre e conte tudo
    order: [['id', 'DESC']],
    // retorna dados a partir de um valor
    offset: offset,
    // busca uma quantidade expecifica de dados na tabela
    limit: 4,
  }).then(articles => {
    var next
    if (offset + 4 >= articles.count) { // count retorna a quantidade de elemento que tem dentro da tabela de artigos
      next = false
    } else {
      next = true
    }
    let result = {
      page: parseInt(page),
      next: next,
      articles: articles,
    }
    tableCategories.findAll().then(categories => {
      res.render('admin/articles/page.ejs', { result: result, categories: categories })
    })
  })
})

export default router

