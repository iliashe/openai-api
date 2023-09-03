const Conversation = require('../models/conversation')

exports.getConversations = (req, res, next) => {
  const userId = req.user.id

  Conversation
    .getConversations({ where: { userId: userId } })
    .then(conversations => {
      res.send(conversations)
    })
    .catch(err => console.log(err))
}