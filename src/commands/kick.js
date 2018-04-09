const GenericModCommand = require(`${__dirname}/_GenericModCommand.js`);
module.exports = GenericModCommand('kick', (guild, id, reason) => {
  return guild.kickMember(id, reason);
});
