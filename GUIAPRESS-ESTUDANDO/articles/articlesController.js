import express from 'express'
let router = express.Router()
import tableCategories from '../categories/Category.js'
import tableArticles from './Article.js' // tabela de artigos
import slugify from 'slugify'

router.get('/admin/articles', (req, res) => {
  tableArticles.findAll({
    include: [{ model: tableCategories }]
  }).then(article => {
    res.render('admin/articles/index.ejs', {
      articles: article
    })
  })
})

router.get('/admin/articles/new', (req, res) => {
  tableCategories.findAll().then(categories => {
    res.render('admin/articles/new.ejs', {
      categories: categories
    })
  })
})

router.post('/articles/save', (req, res) => {

  let title = req.body.title
  let body = req.body.body
  let category = req.body.category

  tableArticles.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category
  }).then(() => {
    res.render('admin/articles/index.ejs')
  })

})

// rota para deletar as categorias
router.post('/articles/delete', (req, res) => {
  let id = req.body.id
  if (id != undefined) { // verifica se e null
    if (!isNaN(id)) { // verifica se e um numero
      tableArticles.destroy({
        where: {
          id: id
        }
      }).then(() => { // então
        res.redirect('/admin/articles/index')
      })
    } else {
      res.render('/admin/articles')
    }
  } else {
    res.redirect('/admin/categories')
  }
})

export default router