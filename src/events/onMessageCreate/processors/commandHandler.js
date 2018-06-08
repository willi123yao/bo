module.exports = async function commandHandler (msg) {
  const mentionPrefix = msg.content.match(new RegExp(`^<@!*${this.user.id}>`));
  const prefix = mentionPrefix
    ? mentionPrefix[0]
    : await this.db.getPrefix(msg.author.id);

  if ((/<@!?\d{17,19}>/).test(prefix)) {
    // note: this could be a simple check for `mentionPrefix`
    // but then there's people like this https://why-are-you-buying-clothes-at.the-soup.store/8b6801.png
    msg.mentions.shift();
  }

  if (!msg.content.startsWith(prefix)) return;

  const [ command, ...args ] = msg.content.slice(prefix.length).trim().split(/ +/g);
  if (this.commands.has(command.toLowerCase())) {
    try {
      let res = await this.commands.get(command.toLowerCase()).execute({ client: this, msg, args });
      if (res) {
        if (res instanceof Object) {
          res = { embed: { ...res, color: 0xCA2D36 } };
        }
        msg.channel.createMessage(res);
      }
    } catch (e) {
      console.error(e.stack);
      msg.channel.createMessage('Something went wrong: ' + e.message);
    }
  }
};
