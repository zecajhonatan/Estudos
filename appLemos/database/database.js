import Sequelize from 'sequelize'

let senha = 'Juliae090320132023' || 123456

const connection = new Sequelize('lemos', 'root', senha, {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00'
})

connection
  .authenticate()
  .then(() => {
    console.log('Conexão do appLemos com o servidor')
  })
  .catch(error => {
    console.log({'error': error.message})
  })

  export default connection

