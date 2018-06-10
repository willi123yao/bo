const GenericModCommand = require(`${__dirname}/../structures/ModCommand.js`);

module.exports = class KickCommand extends GenericModCommand {
  constructor () {
    super({
      action: ['kick', 'kicked'],
      dm: true,
      triggers: ['kick'],
      usage: '{command} <@user> [reason]',
      description: 'Kicks the mentioned user'
    });
  }

  async run ({ guild, user: { username, discriminator, id }, reason }) {
    return guild.kickMember(id, reason)
      .then(() =>
        `Successfully kicked \`${username}#${discriminator}\` (\`${id}\`)${reason !== 'No reason specified' ? ` with reason \`${reason}\`.` : '.'}`
      );
  }
};
