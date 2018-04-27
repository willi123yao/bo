module.exports = class Command {
  constructor (props) {
    this.props = props;
  }

  async performAction ({ client, msg, args }, id) {
    const { action: [ action, actionPT ], dm } = this.props;
    const reason = args.slice(1).join(' ') || 'No reason provided or reason is to be set.';
    const mod = `${msg.author.username}#${msg.author.discriminator}`;

    const user = await client.fetchUser(id);
    if (!user) {
      return 'User not found.';
    }

    if (dm) {
      await client.dm([ action, actionPT ], user.id, mod, reason)
        .catch(e => {
          if (!e.message.includes('50007')) { // can't DM because blocked or doesn't have DMs open
            throw e;
          }
        });
    }

    return this.run({ guild: msg.channel.guild, user, reason })
      .catch(e => {
        if (e.message.includes('403 FORBIDDEN')) {
          return `I can't ${action} this person. :(`;
        } else {
          throw e;
        }
      });
  }

  async execute ({ client, msg, args }) {
    if (args[0] && (/^\d{17,19}$/).test(args[0])) { // argument is an ID
      return this.performAction(args[0]);
    } else if (msg.mentions[0]) {
      return this.performAction({ client, msg, args }, msg.mentions[0].id);
    } else {
      return `You need to specify a user.`;
    }
  }
}
