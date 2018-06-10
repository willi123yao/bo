const GenericModCommand = require(`${__dirname}/../structures/ModCommand.js`);

module.exports = class KickCommand extends GenericModCommand {
  constructor () {
    super({
      action: ['ban', 'banned'],
      dm: true,
      triggers: ['ban'],
      usage: '{command} <@user> [reason]',
      description: 'Bans the mentioned user'
    });

    this.OVERRIDE_ARG = '--im-dumb';
  }

  parseArgs (args) {
    const override = args.find(arg => arg.toLowerCase() === this.OVERRIDE_ARG);
    if (override) {
      this.override = true;
      args.splice(args.indexOf(override), 1);
    }

    return args;
  }

  async run ({ guild, user: { username, discriminator, id, bot }, reason, sudo }) {
    return bot && !sudo
      ? `Are you dumb? (run with \`sudo\` if you actually need to ban a bot)`
      : guild.banMember(id, 7, reason)
        .then(() =>
          `Successfully banned \`${username}#${discriminator}\` (\`${id}\`)${reason !== 'No reason specified' ? ` with reason \`${reason}\`.` : '.'}`
        );
  }
};
