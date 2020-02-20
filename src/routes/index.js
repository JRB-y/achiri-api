const UserRouter = require('./User')
const AuthRouter = require('./Auth')
const TestingRouter = require('./Testing')

module.exports = (app) => {
  /* ====== API V1 User ===== */
  app.use('/api/v1', UserRouter)
  /* ===== API V1 Auth ===== */
  app.use('/api/v1', AuthRouter)

  // Good for testing ...
  app.use('/api/v1/testing', TestingRouter)
}