const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/UserController')

router.get('/user', user_controller.index)

router.get('/user/:id', user_controller.show)

router.post('/user', user_controller.store)

router.patch('/user/:id', user_controller.update)

router.delete('/user/:id', user_controller.delete)

module.exports = router