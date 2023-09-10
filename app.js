require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const sequelize = require('./database')

// models

const Asset = require('./models/asset')
const Bot = require('./models/bot')
const Conversation = require('./models/conversation')
const Message = require('./models/message')
const User = require('./models/user')

// relations

Asset.belongsTo(User)

Bot.hasMany(Message)
Message.belongsTo(Bot)

Bot.hasMany(Conversation)
Conversation.belongsTo(Bot)

Conversation.hasMany(Message)
Message.belongsTo(Conversation)

Message.hasMany(Asset)
Asset.belongsTo(Message)

User.hasMany(Conversation)
Conversation.belongsTo(User)

User.hasMany(Message)
Message.belongsTo(User)

// routes

const userRoutes = require('./routes/user')
const conversationRoutes = require('./routes/conversation')

// app.use(chatRoutes)
app.use('/', (req, res, next) => {
  User
    .findByPk(1)
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})

app.use('/user', userRoutes)
app.use('/conversation', conversationRoutes)

sequelize
  //.sync({ force:true })
  .sync()
  .then(() => {
    return User.findByPk(1)
  })
  .then((user) => {
    if (!user) {
      return User.create({ username: 'Ilia' })
    }
    return user
  })
  .then(user => {
    const port = '5000'
    app.listen(port, () => console.log(`The server is running at http://localhost:${port}`))
  })
  .catch(err => console.log(err))