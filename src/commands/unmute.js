const GenericModCommand = require(`${__dirname}/_GenericModCommand.js`);
module.exports = GenericModCommand('unmute', async function (guild, id, reason) {
  const member = guild.members.get(id);
  if (!member.roles.includes(this.config.roles.muted)) {
    throw 'This user isn\'t muted.';
  }

  return member.removeRole(this.config.roles.muted);
});
