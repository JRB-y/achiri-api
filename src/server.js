const express = require('express')
const bodyParser = require('body-parser')
const session = require('./session')
const passport = require('passport')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session)

// init passport
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())

const Router = require('./routes')
Router(app)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})