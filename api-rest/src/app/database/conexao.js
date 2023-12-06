import mysql from 'mysql'

// criando a conexão com o banco de dados
const conexao = mysql.createConnection({
  host: 'localhost', // local
  port: '3306', // porta || padrão
  user: 'root', // usuario ==> raiz
  password: 'Juliae090320132023', // senha passada na criação do banco de dados
  database: 'db_copa', // nome da tabela criada no banco de dados
})

conexao.connect((erro) => {
  if (erro) console.log(erro)
  else console.log("Conexão feita com sucesso!!")
})

/**
 * executa um codigo sql com ou sem valores
 * @param {string} sql instrução sql a ser executada 
 * @param {string=id  | [selecao , id]} valores a serem passados para o sql
 * @param {string} mensagemRegect mensagem a ser exibida 
 * @returns objeto da Promesse
 */
export const consulta = (sql, valores = '', mensagemReject) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, valores, (error, result) => { // consulta
      if (error) return reject(mensagemReject)
      let row = JSON.parse(JSON.stringify(result))
      return resolve(row)
    })
  })
}

export default conexao




















