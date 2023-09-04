const Conversation = require('../models/conversation')
const User = require('../models/user')

exports.getConversations = (req, res, next) => {
  const userId = req.user.id

  Conversation
    .getConversations({ where: { userId: userId } })
    .then(conversations => {
      res.send(conversations)
    })
    .catch(err => console.log(err))
}

exports.postLogin = (req, res, next) => {
  // const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  console.log(email)
  console.log(password)

  User
    .findOne({
      where: {
        email: email,
        password: password 
      } 
    })
    .then(user => {
      if (user) {
        Conversation
          .findAll({ where: { UserId: user.id } })
          .then(conversations => res.send(conversations))
      }
    })
    .catch(err => console.log(err))
}