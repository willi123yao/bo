module.exports = ([ action, actionPT ], props) => async function GenericModCommand (msg, args) {
  const reason = args.slice(1).join(' ') || 'No reason provided or reason is to be set.';
  const mod = `${msg.author.username}#${msg.author.discriminator}`;

  const performAction = async (id) => {
    const user = await this.fetchUser(id);
    if (!user) {
      return 'User not found.';
    } else if (user.bot && action === 'ban') {
      return 'Are you dumb?';
    }

    await this.dm([ action, actionPT ], user.id, mod, reason)
      .catch(e => {
        if (!e.message.includes('50007')) { // can't DM because blocked or doesn't have DMs open
          throw e;
        }
      });

    return props.method.call(this, msg.channel.guild, user, reason)
      .catch(e => {
        if (typeof e === 'string') {
          return e;
        } else if (e.message && e.message.includes('403 FORBIDDEN')) {
          return `I can't ${action} this person. :(`;
        } else {
          throw e;
        }
      });
  };

  if (args[0] && (/^\d{17,19}$/).test(args[0])) { // argument is an ID
    return performAction(args[0]);
  } else if (msg.mentions[0]) {
    return performAction(msg.mentions[0].id);
  } else {
    return `Did not specify a user to ${action}.`;
  }
};
