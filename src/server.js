const express = require('express')
// const cors = require('cors')
const app = express()
const PORT = 3000

app.use(express.json())

const Router = require('./routes')
Router(app)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})