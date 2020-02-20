/**
 * Need to refactor this file into a folder
 * 
 * To declare multiple strategies facebook, google ...
 */
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User')

// Local Strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    User.findOne({
      where: { email, password },
    }).then(user => {
      return done(null, user)
    }).catch(() => {
      return done(null, false, { message: 'Invalid credentials.\n' })
    })
  }
))

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here')
  done(null, user.id)
})

// tell passport how to deserialize the user
passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is: ${id}`)
  User
    .findOne({
      where: { id },
    })
    .then(user => done(null, user))
    .catch(error => done(error, false))

})

module.exports = passport