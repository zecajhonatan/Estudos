import Sequelize from 'sequelize'

const connection = new Sequelize('lemos', 'root', 'Juliae090320132023', {
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

