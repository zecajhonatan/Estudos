let express = require('express') // importando objeto do express
let router = express.Router() // rotas categorias
// let botao = document.querySelector("#botao").innerHTML = "zeca"

let Category = require('./Category') // importando tabela de categorias
let slugify = require('slugify') // importanto modulo do node

router.get('/admin/categories/new', (req, res) => { // rota para cadastrar novas categorias
    res.render('admin/categories/new')
})


router.post('/categories/save', (req, res) => { // salvar as categorias no banco de dados

    let title = req.body.title;

    console.log(title)

    if (title != undefined) {

        Category.create({ // criação da tabela no banco de dados
            title: title,
            slug: slugify(title) // faz uma conversão
        }).then(() => {
            res.redirect('/admin/categories')
        })

    } else {
        res.redirect('/admin/categories/new')
    }
})


router.get('/admin/categories', (req, res) => { // busca todos dados no bando de dados
    Category.findAll() // pegar todo os dados da tabela que retorna um objeto
        .then((categories) => { // um objeto de todos os dados encontrados na tabela
            res.render('admin/categories/index', {
                categories: categories
            })
        })
})


router.post('/categories/delete', (req, res) => {

    let id = req.body.id
    
    if (id != undefined) { // verifica se o campo esta preenchido

        if (!isNaN(id)) { // verificando se o id e um numero

            Category.destroy({
                where: {
                    id: id,
                }
            }).then(() => {
                res.redirect('/admin/categories')
            })

        } else {
            res.redirect('/admin/categories') // não for numero
        }
    } else {
        res.redirect('/admin/categories') // for null
    }
})

module.exports = router



