require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

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


app.use('/', (req, res, next) => {
  console.log(req.body)
})

const port = '5000'
app.listen(port, () => console.log(`The backend is running at http://localhost:${port}`))