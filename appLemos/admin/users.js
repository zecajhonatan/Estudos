import express from 'express'
let router = express.Router()
import Users from './tableUsers.js'
import bcrypt from 'bcryptjs'
import session from 'express-session'
import adminAuth from '../middleweres/adminAuth.js'

router.use(session({
  secret: 'admin',
  cookie: {
    maxAge: 600000,
  }
}))

router.get('/admin/login', (req, res) => {
  res.render("admin/pageLogin.ejs")
})

router.get('/admin/registration', (req, res) => {
  res.render('admin/registrationPage.ejs')
})

router.get('/list/users',adminAuth, (req, res) => {
  Users.findAll().then((users) => {
    res.render('admin/listUsers.ejs', {
      users: users
    })
  })
})

router.post('/admin/registration/create', (req, res) => {
  let { email, password } = req.body
  Users.findOne({ where: { email: email } }).then(user => {
    if (user == undefined) {
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)
      if (email != undefined && hash != undefined) {
        Users.create({
          email: email,
          password: hash
        }).then(() => {
          res.redirect('/customer/list')
        }).catch(() => {
          res.redirect('/admin/registration')
        })
      } else {
        res.redirect('/admin/registration')
      }
    } else {
      res.redirect('/admin/registration')
    }
  })
})

router.post('/admin/authenticate', (req, res) => {
  let { email, password } = req.body
  Users.findOne({ where: { email: email } }).then(user => {
    if (user != undefined) { // SE EXISTIR O EMAIL NO BANCO VAMOS FAZER A VALIDAÇÃO DA SENHA
      let correct = bcrypt.compareSync(password, user.password)
      if (correct) {
        req.session.user = {
          id: user.id,
          email: user.email
        }
        res.redirect('/list/users')
      } else {
        res.redirect('/admin/login')
      }
    } else {
      res.redirect('/admin/login')
    }
  })
})

router.get('/admin/logout', (req, res) => {
  req.session.user = undefined
  res.redirect('/admin/login')
})

export default router