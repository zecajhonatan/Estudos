let express = require("express"); // exporta o modulo do express
let app = express(); // criar uma instancia do express

let bodyParser = require("body-parser"); // exportar modulo body-parser
let connection = require("./database/database"); // importação do objeto de conexão com o banco de dados

// arquivos de rotas
let categoriesController = require("./categories/categoriesController"); // importando arquivo de rotas (categorias)
let articlesController = require("./articles/articlesController"); // importando arquivo de rotas (artigos)


// tabelas
const Article = require("./articles/Article"); // importação modulo/Tabela
const Category = require("./categories/Category"); // importação modulo/Tabela

// view engine
app.set("view engine", "ejs"); // dizendo para o node usar o ejs / qual o motor de renderização que queremos trabalhar no node

// body-parses
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static
app.use(express.static("public")); // dizendo para o express aceitar trabalhar com arquivos staticos ==> passando o nome da pasta que os arquivos vão ficar
// database

connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados feita com sucesso");
  })
  .catch((error) => {
    console.log("Erro na conexão com o banco de dados");
  });

app.use("/", categoriesController); // dizendo para o express usar as rotas de outro arquivo
app.use("/", articlesController); // dizendo para o express usar as rotas de outro arquivo



// rotas das categorias separadas
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/tabelas", (req, res) => {
  res.render("tabelas.ejs");
})

// criação servidor
app.listen(8080, () => {
  console.log("Servidor conectado com sucesso");
});
