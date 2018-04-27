const GenericModCommand = require(`${__dirname}/_GenericModCommand.js`);
module.exports = GenericModCommand('mute', async function (guild, id, reason) {
  const member = guild.members.get(id);
  if (member.roles.includes(this.config.roles.muted)) {
    throw 'This user is already muted.';
  }

  return member.addRole(this.config.roles.muted);
});
