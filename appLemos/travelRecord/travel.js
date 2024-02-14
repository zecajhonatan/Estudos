import express from 'express'
let router = express.Router()
import trips from './travelTable.js'
import session from 'express-session'

router.use(
  session({
    secret: "admin",
    cookie: {
      maxAge: 600000,
    },
  }))

// DIRECIONA PARA LISTA DE CADASTRO
router.get('/trips/list', (req, res) => {
  trips.findAll().then(trips => {
    res.render('trips/travelList.ejs', {
      trips: trips
    })
  })
})

// DIRECIONA PARA PAGINA DE EDIÇÃO
router.get('/trips/edit', (req, res) => {
  res.render('trips/travelList.ejs')
})

// SALVA DADOS NA BASE DE DADOS
router.post('/trips/create', (req, res) => {
  let { cliente, endereco, material, quantidade, precoUnitario, valorTotal, vendedor, formaPagamento, telefone } = req.body
  let quantidadeT = parseInt(quantidade).toFixed(3)
  let precoUnitarioT = parseInt(precoUnitario).toFixed(2)
  let valorTotalT = parseInt(valorTotal).toFixed(2)
  trips.create({
    cliente: cliente.toUpperCase(),
    endereco: endereco.toUpperCase(),
    material: material.toUpperCase(),
    quantidade: quantidadeT,
    precoUnitario: precoUnitarioT,
    valorTotal: valorTotalT,
    vendedor: vendedor.toUpperCase(),
    formaPagamento: formaPagamento.toUpperCase(),
    telefone: telefone
  }).then(() => {
    res.redirect('/trips/list')
  })
})

// EDITAR DADOS 
router.get('/trips/edit/:id', (req, res) => {
  let id = req.params.id
  if (isNaN(id)) {
    res.redirect('/trips/list')
  }
  trips.findByPk(id).then(trips => {
    res.render('trips/travelEdit.ejs', {
      trips: trips
    })
  })
})

// ATUALIZAR DADOS NA BASE DE DADOS
router.post('/trips/update', (req, res) => {
  let id = req.body.id
  let { cliente, endereco, material, quantidade, precoUnitario, valorTotal, vendedor, formaPagamento, telefone } = req.body
  trips.update({
    cliente: cliente.toUpperCase(),
    endereco: endereco.toUpperCase(),
    material: material.toUpperCase(),
    quantidade: quantidade,
    precoUnitario: precoUnitario,
    valorTotal: valorTotal,
    vendedor: vendedor.toUpperCase(),
    formaPagamento: formaPagamento.toUpperCase(),
    telefone: telefone
  }, {
    where: { id: id }
  }).then(() => {
    res.redirect('/trips/list')
  })
})

// DELETAR OS DADOS DA BASE DE DADOS

router.post('/trips/delete/:id', (req, res) => {
  let id = req.params.id
  if (!isNaN(id)) {
    if (id != undefined) {
      trips.destroy({ where: { id: id } }).then(() => {
        res.redirect('/trips/list')
      })
    } else {
      res.redirect('/trips/list')
    }
  } else {
    res.redirect('/trips/list')
  }
})

// DIRECIONA PARA CADASTRO
router.post('/trips/register', (req, res) => {
  let id = req.body.codigo
  trips.findOne({ where: { id: id } }).then(dados => {
    res.render('trips/travelRecord.ejs', {
      dados: dados
    })
  })
})

export default router

