import express from 'express'
let router = express.Router()
import User from './user.js' // model --> tabela criada no banco de dados
import bcrypt from 'bcryptjs' // pacote para criar um hash na senha para o banco de dados

// rota responsavel por renderizar e listar os usuarios na tela --> id | email
router.get('/admin/users', (req, res) => {
  User.findAll().then(users => {
    res.render('admin/users/index.ejs', { users: users })
  })
})

// rota responsavel por renderizar a view para cadastrar o usuario
router.get('/admin/users/create', (req, res) => {
  res.render('admin/users/create.ejs')
})

// rota responsavel pelo salvamento de dados do usuario no banco de dados --> ex: email | senha com hash
router.post('/users/create', (req, res) => {
  let email = req.body.email
  let password = req.body.password
  User.findOne({ where: { email: email } }).then(user => {
    if (user == undefined) {
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)
      User.create({
        email: email,
        password: hash
      }).then(() => {
        res.redirect('/login')
      }).catch(error => {
        res.redirect('/')
      })
    } else {
      res.redirect('/admin/users/create')
    }
  })
})

router.get('/login', (req, res) => {
  res.render('admin/users/login.ejs')
})

router.post('/authenticate', (req, res) => {
  let email = req.body.email
  let password = req.body.password

  User.findOne({ where: { email: email }, raw: true }).then(user => {
    if (user != undefined) { // se existe um usuario com esse e-mail
      // validar a senha
      let correct = bcrypt.compareSync(password, user.password) // comparação de sincronização
      if (correct) {
        req.session.user = {
          id: user.id,
          email: user.email
        }
        res.redirect('/admin/articles')
      } else {
        res.redirect('/login')
      }
    } else {
      res.redirect('/login')
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.user = undefined
  res.redirect('/login')
})

export default router