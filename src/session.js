const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

module.exports = session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
})