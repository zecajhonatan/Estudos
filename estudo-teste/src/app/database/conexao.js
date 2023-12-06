import mysql from 'mysql'

let conexao = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Juliae090320132023',
  database: 'db_copa'
})

conexao.connect((error) => {
  if (error) {
    console.log({ 'error': error})
  } else {
    console.log('Banco de dados conectado...')
  }
})

export default conexao


