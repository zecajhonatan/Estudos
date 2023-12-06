let express = require('express') // importanto modulo express
let router = express.Router() // rotas artigos

router.get('/articles', (req, res) => {
    res.send('ROTA DE ARTIGOS')
})

router.get('/admin/articles/new', (req, res) => {
    res.send('ROTA PARA CRIAR UM NOVO ARTIGO')
})

module.exports = router