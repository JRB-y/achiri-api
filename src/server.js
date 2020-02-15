const path = require('path')
const express = require('express')
// const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

const Router = require('./routes')
Router(app)

const db = require('./db')



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})