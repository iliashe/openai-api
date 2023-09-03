const express = require('express')

const userController = require('../controllers/user')
const router = express.Router()

router.get('/conversations', userController.getConversations)

module.exports = router
