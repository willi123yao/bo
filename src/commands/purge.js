module.exports = class PurgeCommand {
  async execute ({ client, msg, args }) {
    const count = args.find(arg => !isNaN(arg));
    if (!count) {
      return 'Specify an amount of messages to clean.';
    }

    const userFilter = msg.mentions[0]
      ? (m) => m.author.id === msg.mentions[0].id
      : () => true;

    const channelID = msg.channelMentions[0] || msg.channel.id;

    const messages = await client.getMessages(channelID, 100)
      .then(messages =>
        messages
          .filter(userFilter)
          .slice(0, Number(count))
          .map(message => message.id)
      );

    await client.deleteMessages(channelID, messages, `Purge command used by ${msg.author.username}#${msg.author.discriminator}`);

    msg.channel.createMessage(`Deleted ${messages.length} messages.`)
      .then(message => setTimeout(message.delete.bind(message), 5e3));
  }

  get props () {
    return {
      triggers: ['purge', 'clean', 'clear'],
      usage: '{command} <count> [@user] [#channel]',
      description: 'Clean an amount of messages. Arguments can be in any order.'
    };
  }
};
