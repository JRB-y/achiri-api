const UserRouter = require('./User')

module.exports = (app) => {
  app.use(UserRouter)
}