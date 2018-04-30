module.exports = async function onMessageCreate (msg) {
  if (!msg.channel.guild || msg.channel.guild.id !== this.config.serverID) {
    return;
  }

  if (msg.mentions.length > 8 && msg.channel.guild.id === '264445053596991498') {
    msg.member.ban(0, 'Mass pinging');
  }

  const mentionPrefix = msg.content.match(new RegExp(`^<@!*${this.user.id}>`));
  const prefix = mentionPrefix
    ? mentionPrefix[0]
    : this.config.prefix;

  if (
    msg.author.bot ||
    !msg.member.roles.includes(this.config.modRole) ||
    !msg.content.startsWith(prefix)
  ) {
    return;
  }

  const [ command, ...args ] = msg.content.slice(prefix.length).trim().split(/ +/g);
  if (this.commands.has(command.toLowerCase())) {
    try {
      const res = await this.commands.get(command.toLowerCase()).execute({ client: this, msg, args });
      if (res) {
        msg.channel.createMessage(res);
      }
    } catch (e) {
      console.error(e.stack);
      msg.channel.createMessage('Something went wrong: ' + e.message);
    }
  }
};