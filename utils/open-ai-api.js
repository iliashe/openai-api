try {

  sequelize.authenticate().then(() => console.log('success'))

} catch (err) {

  console.log('error')

}

const OpenAI = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

exports.sendMessageToBot = async function sendMessageToBot(content) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: content }],
    model: 'gpt-3.5-turbo',
  })
  return completion
}