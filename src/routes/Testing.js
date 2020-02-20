const express = require('express')
const router = express.Router()

router.get('/test', function (req, res) {
  res.json({ success: true, msg: 'We are in Testing Route/Controller' })
})

module.exports = router
