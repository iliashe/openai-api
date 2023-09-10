try {

  sequelize.authenticate().then(() => console.log('success'))

} catch (err) {

  console.log('error')

}

const OpenAI = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

exports.sendMessageToAssistant = async function sendMessageToAssistant(messages) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are very scared" },
      ...messages
    ],
    model: 'gpt-3.5-turbo',
  })
  return completion
}