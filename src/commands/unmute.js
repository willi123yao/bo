const GenericModCommand = require(`${__dirname}/../structures/ModCommand.js`);

module.exports = class KickCommand extends GenericModCommand {
  constructor () {
    super({
      action: ['unmute', 'unmuted'],
      dm: false,
      triggers: ['unmute'],
      usage: '{command} <@user> [reason]',
      description: 'Unmutes the mentioned user'
    });
  }

  async run ({ client: { config }, user: { username, discriminator, id, bot }, guild: { members }, reason }) {
    const member = members.get(id);
    if (!member) {
      return 'This user is not in the server.';
    }
    if (!member.roles.includes(config.mutedRole)) {
      return 'This user isn\'t muted.';
    }

    return member.removeRole(config.mutedRole, reason)
      .then(() =>
        `Successfully unmuted \`${username}#${discriminator}\` (\`${id}\`)${reason !== 'No reason specified' ? ` with reason \`${reason}\`.` : '.'}`
      );
  }
};
