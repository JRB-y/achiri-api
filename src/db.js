const Sequelize = require('sequelize')
const db = new Sequelize('achiri', 'root', '123456', { host: 'localhost', dialect: 'mysql' })

// testing connection
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
// export the db connection
module.exports = db