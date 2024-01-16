import express from 'express'
let router = express.Router()
import tableCategory from './Category.js'
import slugify from 'slugify'
import adminAuth from '../midllewares/adminAuth.js'

router.get('/admin/categories/new',adminAuth, (req, res) => {
  res.render('admin/categories/new.ejs')
})

// rota para salvar as categorias no banco de dados
router.post('/categories/save',adminAuth, (req, res) => {
  let title = req.body.title
  if (title != '') {
    tableCategory.create({
      title: title,
      slug: slugify(title)
    }).then(() => {
      res.redirect('/admin/categories')
    })
  } else {
    res.render('admin/categories/new.ejs')
  }
})

// renderizar todas as categorias na tela
router.get('/admin/categories',adminAuth, (req, res) => {
  tableCategory.findAll().then(categories => { // encontre tudo que tem nessa tabela no banco de dados
    res.render('admin/categories/index.ejs', {
      categories: categories
    })
  })
})

// rota para editar as categorias
router.get('/admin/categories/edit/:id',adminAuth, (req, res) => {
  let id = req.params.id
  if (isNaN(id)) {
    res.redirect('/admin/categories')
  }
  tableCategory.findByPk(id).then(category => { // então
    if (category != undefined) {
      res.render('admin/categories/edit.ejs', {
        category: category
      })
    } else {
      res.redirect('/admin/categories')
    }
  }).catch(error => {
    res.redirect('/admin/categories')
  })
})

// faz a atualização dos dados no banco de dados
router.post('/categories/update',adminAuth, (req, res) => {
  let id = req.body.id
  let title = req.body.title
  tableCategory.update({ title: title, slug: slugify(title) }, {
    where: {
      id: id,
    }
  }).then(() => {
    res.redirect('/admin/categories')
  })
})

// rota para deletar as categorias
router.post('/categories/delete',adminAuth, (req, res) => {
  let id = req.body.id
  if (id != undefined) { // verifica se e null
    if (!isNaN(id)) { // verifica se e um numero
      tableCategory.destroy({
        where: {
          id: id
        }
      }).then(() => { // então
        res.redirect('/admin/categories')
      })
    } else {
      res.render('/admin/categories')
    }
  } else {
    res.redirect('/admin/categories')
  }
})

export default router
// exportação padrão

