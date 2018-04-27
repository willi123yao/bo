const GenericModCommand = require(`${__dirname}/_GenericModCommand.js`);
module.exports = GenericModCommand(['ban', 'banned'], (guild, user, reason) => {
  return guild.banMember(user.id, 7, reason)
    .then(() => `☑ Successfully banned ${user.username} with reason \`${reason}\`.`);
});
