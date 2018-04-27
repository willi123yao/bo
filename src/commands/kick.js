const GenericModCommand = require(`${__dirname}/../structures/ModCommand.js`);

module.exports = class KickCommand extends GenericModCommand {
  constructor () {
    super({
      action: ['kick', 'kicked'],
      dm: true,
      triggers: ['kick'],
      usage: 'no',
      description: 'no'
    });
  }

  run ({ guild, id, reason }) {
    return guild.kickMember(id, reason).then(() => 'ok');
  }
};
