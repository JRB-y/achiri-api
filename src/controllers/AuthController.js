const passport = require('../passport')

/**
 * Login user
 * 
 * Here we use the passport authenticate with local strategy
 */
exports.login = (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    // if we don't pass the local strategy
    // see passport.js 
    if (info) { return res.send(info.message) }
    if (err) { return next(err) }
    if (!user) { return res.status(404).json({ msg: "Verifiez vos identifiants" }) }

    // try to log the user
    req.login(user, (err) => {
      if (err) { return next(err) }
      return res.status(200).json(user)
    })

  })(req, res, next)

  // res.send('Login page POST \n')
}

/**
 * Logout the session
 * 
 * @TODO
 */
exports.logout = () => {
  return null
}