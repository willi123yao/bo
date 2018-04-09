const GenericModCommand = require(`${__dirname}/_GenericModCommand.js`);
module.exports = GenericModCommand('ban', (guild, id, reason) => {
  return guild.banMember(id, 7, reason);
});
