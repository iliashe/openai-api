const express = require('express')

const userController = require('../controllers/user')
const router = express.Router()

router.get('/conversations', userController.getConversations)

// router.post('/login', userController.postLogin)

module.exports = router
