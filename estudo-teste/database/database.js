import Sequelize from 'sequelize'

const connection = new Sequelize('guia_perguntas', 'root', 'Juliae090320132023', {
  host: 'localhost',
  dialect: 'mysql'
})

export default connection




