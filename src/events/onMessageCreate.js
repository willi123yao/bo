const responses = require(`${__dirname}/../responses.json`);

module.exports = async function onMessageCreate (msg) {
  if (!msg.channel.guild) return;

  if (msg.mentions.length > 8) {
    msg.member.ban(0, 'Mass pinging');
  }

  // DSL hackbans
  if (
    msg.channel.guild.id === this.config.dslID &&
    msg.content.startsWith('.hackban') &&
    msg.member.roles.includes(this.config.dslMods)
  ) {
    const [ , id ] = msg.content.split(/ +/g);
    if (!id) {
      return msg.channel.createMessage('give id ples');
    }

    if (!(/\d{17,19}/).test(id)) {
      return msg.channel.createMessage('invalid id hoe');
    }

    msg.channel.guild.banMember(id, 7, `Hackbanned by ${msg.author.username}`)
      .then(() => msg.channel.createMessage(':eye: :nose: :eye:\n     :lips:\n:ok_hand: :ok_hand: :weary: :weary:'))
      .catch(e => msg.channel.createMessage(`:x: :weary: :x: :x: ${e.message}`));
  }

  if (!msg.channel.guild || msg.channel.guild.id !== this.config.serverID) {
    return;
  }

  if (
    msg.author.bot ||
    !msg.member.roles.includes(this.config.modRole)
  ) {
    return;
  }

  for (const response in responses) {
    if (msg.content.toLowerCase() === response) {
      return msg.channel.createMessage(responses[response].replace(/\$USER/g, msg.author.username.toLowerCase()));
    }
  }

  if (msg.content.startsWith('sudo ')) { // fuck you, 182245310024777728
    msg.content = msg.content.substring('sudo '.length);
    msg.sudo = true;
  }

  const mentionPrefix = msg.content.match(new RegExp(`^<@!*${this.user.id}>`));
  const prefix = mentionPrefix
    ? mentionPrefix[0]
    : await this.getPrefix(msg.author.id);

  if ((/<@!*\d{17,19}>/).test(prefix)) {
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
