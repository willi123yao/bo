const responses = require(`${__dirname}/responses.json`);

module.exports = async function autoResponses (msg) {
  for (const response in responses) {
    if (msg.content.toLowerCase() === response) {
      return msg.channel.createMessage(responses[response].replace(/\$USER/g, msg.author.username.toLowerCase()));
    }
  }
};
