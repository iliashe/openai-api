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

const chatRoutes = require('./routes/chat')
const userRoutes = require('./routes/user')
const conversationRoutes = require('./routes/conversation')

app.use('/', (req, res, next) => {
  User
    .findByPk(1)
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})
  
app.use(chatRoutes)
app.use(userRoutes)
app.use(conversationRoutes)

// try {
//   sequelize.authenticate().then(() => console.log('success'))
// } catch (err) {
//   console.log('error')
// }

// const OpenAI = require('openai')
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function fn() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: 'user', content: 'Say this is a test' }],
//     model: 'gpt-3.5-turbo',
//   });
  
//   console.log(completion.choices);
// }

sequelize
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
    console.log(user)
    const port = '5000'
    app.listen(port, () => console.log(`The server is running at http://localhost:${port}`))
  })
  .catch(err => console.log(err))