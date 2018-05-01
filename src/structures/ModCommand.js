module.exports = class Command {
  constructor (props) {
    this.props = props;
  }

  async performAction ({ client, msg }, id, reason) {
    reason = reason || 'No reason specified';
    const { action: [ action, actionPT ], dm } = this.props;
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

    return this.run({ guild: msg.channel.guild, sudo: msg.sudo, user, reason, client })
      .catch(e => {
        if (e.message.includes('403 FORBIDDEN')) {
          return `I can't ${action} this person. :(`;
        } else {
          throw e;
        }
      });
  }

  async execute (props) {
    if (this.parseArgs) {
      props.args = this.parseArgs(props.args) || props.args;
    }

    let { args, msg: { mentions: [ mention ], channel: { guild } } } = props;

    if (mention) {
      return this.performAction(props, mention.id, args.slice(1).join(' '));
    }

    if ((/^\d{17,19}$/).test(args[0])) { // it's an ID
      return this.performAction(props, args[0], args.slice(1).join(' '));
    }

    const tag = args.join(' ').match(/^.*#\d{4}/);
    if (tag) { // it's a tag
      const user = guild.members.find(({ username, discriminator }) =>
        `${username}#${discriminator}` === tag[0]
      );

      return user
        ? this.performAction(props, user.id, args.join(' ').replace(tag[0], '').trim())
        : `I couldn't find anyone with the tag \`${tag[0]}\`. Note that this command is case-sensitive.`;
    }

    return 'Invalid arguments passed. Specify a *valid* mention, ID or tag.';
  }
};
