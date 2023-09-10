const Conversation = require('../models/conversation')
const User = require('../models/user')

const openAIAPI = require('../utils/open-ai-api')

exports.postSendMessage = (req, res, next) => {
  const message = req.body.message
  //const userId = req.body.user.id

  let conversationId = req.body.conversationId
  let conversation

  // create new conversation, if conversation id was not provided
  if (!conversationId) {
    
    req.user
      .createConversation()
      .then(_conversation => {
        conversation = _conversation
        
        conversationId = conversation.id
        return conversation.createMessage({ content: message })
      })
      .then(message => {
        return openAIAPI.sendMessageToBot(message.content)
      })
      .then(completion => {
        console.log(completion.choices)
        const botMessageContent = completion.choices[0].message.content
        return conversation.createMessage({ content: botMessageContent })
      })
      .then(message => {
        return Conversation.findByPk(conversationId, { include: ['messages'] })
      })
      .then(conversation => res.send(conversation))
      .catch(err => console.log(err))
    
  } else {
    
    req.user
      .getConversations({ where: { id: conversationId } })
      .then(conversations => {
        conversation = conversations[0]
        return conversation.createMessage({ content: message })
      })
      .then(message => {
        return openAIAPI.sendMessageToBot(message.content)
      })
      .then(completion => {
        console.log(completion.choices)
        const botMessageContent = completion.choices[0].message.content
        return conversation.createMessage({ content: botMessageContent })
      })
      .then(message => {
        return Conversation.findByPk(conversationId, { include: ['messages'] })
      })
      .then(conversation => {
        res.send(conversation)
      })
      .catch(err => console.log(err))

  }
}
