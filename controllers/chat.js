exports.postSendMessageToBot = (req, res, next) => {
  const message = req.body.message

  // find the conversation that the message belongs to


  req.user
    .createMessage({
      content: message
    })
    .then(() => res.send(message))
    .catch(err => console.log(err))
}