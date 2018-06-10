const GenericModCommand = require(`${__dirname}/../structures/ModCommand.js`);

module.exports = class KickCommand extends GenericModCommand {
  constructor () {
    super({
      action: ['mute', 'muted'],
      dm: true,
      triggers: ['mute'],
      usage: '{command} <@user> [reason]',
      description: 'Mutes the mentioned user'
    });
  }

  async run ({ client: { config }, user: { username, discriminator, id, bot }, guild: { members }, reason }) {
    const member = members.get(id);
    if (!member) {
      return 'This member isn\'t in the server.';
    }
    if (member.roles.includes(config.mutedRole)) {
      return 'This user is already muted.';
    }

    return member.addRole(config.mutedRole, reason)
      .then(() =>
        `Successfully muted \`${username}#${discriminator}\` (\`${id}\`)${reason !== 'No reason specified' ? ` with reason \`${reason}\`.` : '.'}`
      );
  }
};
