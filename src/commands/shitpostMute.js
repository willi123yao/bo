const GenericModCommand = require(`${__dirname}/_GenericModCommand.js`);
module.exports = GenericModCommand('shitpostMute', async function (guild, id, reason) {
  const member = guild.members.get(id);
  if (member.roles.includes(this.config.roles.shitpost)) {
    throw 'This user is already shitpost muted.';
  }

  return member.addRole(this.config.roles.shitpost);
});
