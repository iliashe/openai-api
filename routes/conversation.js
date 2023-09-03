const express = require('express')

const conversationController = require('../controllers/conversation')
const router = express.Router()

router.post('/start-conversation')
router.post('/delete-conversation')
router.post('/send-message', conversationController.postSendMessage)
router.post('/delete-message')

module.exports = router