const Conversation = require('../models/conversation')
const User = require('../models/user')

const openAIAPI = require('../utils/open-ai-api')

function getConversation(conversation) {
  return (conversation) => {}
}

async function conversationSaveMessage(conversation, message) {
  await conversation.createMessage({
    content: message.content,
    role: message.role
  })

  const updatedConversation = await conversation.reload({ include: ["messages"] })
  console.log(updatedConversation)
  return updatedConversation
}

async function conversationSendToAssistant(conversation) {
  const _messages = await conversation.getMessages()

  // adjusting the messages object to match the openAI api request schema
  const messages = _messages.map(message => { 
    return {
      role: message.role,
      content: message.content
    } 
  })

  const completion = await openAIAPI.sendMessageToAssistant(messages)
  return [conversation, completion]
}


exports.postSendMessage = (req, res, next) => {
  const message = {
    content: req.body.message,
    role: "user"
  }
  //const userId = req.body.user.id

  let conversationId = req.body.conversationId

  let getConversation

  // create new conversation, if conversation id was not provided
  if (!conversationId) {
    
    getConversation = req.user
      .createConversation()

    
  } else {
    
    getConversation = req.user
      .getConversations({ where: { id: conversationId } })
      .then(conversations => conversations[0])

  }

  getConversation
    .then(conversation => conversationSaveMessage(conversation, message))
    .then(conversation => conversationSendToAssistant(conversation))
    .then(([conversation, completion]) => conversationSaveMessage(conversation, completion.choices[0].message))
    .then(conversation => res.send(conversation))
    .catch(err => console.log(err))
    
}
