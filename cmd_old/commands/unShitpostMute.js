const GenericModCommand = require(`${__dirname}/_GenericModCommand.js`);
module.exports = GenericModCommand('unshitpostmute', async function (guild, id, reason) {
  const member = guild.members.get(id);
  if (!member.roles.includes(this.config.roles.shitpost)) {
    throw 'This user isn\'t shitpost muted.';
  }

  return member.removeRole(this.config.roles.shitpost);
});
