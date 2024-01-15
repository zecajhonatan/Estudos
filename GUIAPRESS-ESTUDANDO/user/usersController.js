import express from 'express'
let router = express.Router()
import User from './user.js'
import bcrypt from 'bcryptjs'

router.get('/admin/users', (req, res) => {
  User.findAll().then(users => {
    res.render('admin/users/index.ejs', { users: users })
  })
})

router.get('/admin/users/create', (req, res) => {
  res.render('admin/users/create.ejs')
})

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
        res.redirect('/')
      }).catch(error => {
        res.redirect('/')
      })
    } else {
      res.redirect('/admin/users/create')
    }
  })
})

export default router