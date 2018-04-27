module.exports = async function onMessageCreate (msg) {
  if (msg.mentions.length > 8 && msg.channel.guild.id === '264445053596991498') {
    msg.member.ban(0, 'Mass pinging');
  }

  if (
    !msg.channel.guild ||
    msg.channel.guild.id !== this.config.serverID ||
    msg.author.bot ||
    ![ this.user, msg.author ].every(u => msg.channel.permissionsOf(u.id).has('banMembers')) ||
    !msg.content.startsWith(this.config.prefix)
  ) {
    return;
  }

  const [ command, ...args ] = msg.content.slice(this.config.prefix.length).trim().split(/ +/g);
  if (this.commands.has(command.toLowerCase())) {
    try {
      const res = await this.commands.get(command.toLowerCase()).call(this, msg, args || []);
      if (res) {
        msg.channel.createMessage(res);
      }
    } catch (e) {
      console.error(e.stack);
      msg.channel.createMessage('Something went wrong: ' + e.message);
    }
  }
};
