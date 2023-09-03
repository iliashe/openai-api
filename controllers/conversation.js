const Conversation = require('../models/conversation')
const User = require('../models/user')

exports.postSendMessage = (req, res, next) => {
  const message = req.body.message
  //const userId = req.body.user.id

  let conversationId = req.body.conversationId

  // create new conversation, if conversation id was not provided
  if (!conversationId) {
    
    req.user
      .createConversation()
      .then(conversation => {
        conversationId = conversation.id
        return conversation.createMessage({ content: message })
      })
      .then(message => {
        res.send(message)
      })
      .catch(err => console.log(err))
    
  } else {
    
    Conversation
      .findByPk(conversationId)
      .then(conversation => {
        return conversation.createMessage({ content: message })
      })
      .then(message => {
        res.send(message)
      })
      .catch(err => console.log(err))

  }
}