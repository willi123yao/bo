const processors = require(`${__dirname}/processors`);

module.exports = async function onMessageCreate (msg) {
  if (!msg.channel.guild) return;

  if (await processors.DSLHackban.call(this, msg)) {
    return;
  }

  if (
    msg.channel.guild.id !== this.config.serverID ||
    msg.author.bot ||
    !msg.member.permissions.has('banMembers')
  ) {
    return;
  }

  if (msg.content.startsWith('sudo ')) { // fuck you, 182245310024777728
    msg.content = msg.content.substring('sudo '.length);
    msg.sudo = true;
  }

  for (const processor of Object.values(processors)) {
    processor.call(this, msg);
  }
};
