// controle de rota de clientes
import express from 'express'
let router = express.Router()
import customerTable from './customerRegistrationTable.js'

router.get('/customer/new', (req, res) => {
  res.render('customer/customerRegistration.ejs')
})

router.get('/customer/list', (req, res) => {
  customerTable.findAll().then(customers => {
    res.render('customer/customerList.ejs', {
      customers: customers
    })
  })
})

router.post('/customer/save', (req, res) => {
  let { cliente, endereco, cpf, telefone, vendedor, formaPagamento } = req.body
  customerTable.create({
    customers: cliente.toUpperCase(),
    address: endereco.toUpperCase(),
    cpf: cpf,
    telephone: telefone,
    seller: vendedor,
    paymentMethod: formaPagamento
  }).then(() => {
    res.redirect('/customer/list')
  }).catch(error => {
    console.log({'error': error.message})
  })
})

router.post('/customer/delete', (req, res) => {
  let id = req.body.id
  console.log(id)
  if(id != undefined) {
    if(!isNaN(id)) {
      customerTable.destroy({
        where: { id: id}
      }).then(() => {
        res.redirect('/customer/list')
      })
    } else {
      res.redirect('/customer/list')
    }
  } else {
    res.redirect('/customer/list')
  }
})












export default router