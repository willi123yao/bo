module.exports = class PrefixCommand {
  async execute ({ client, msg, args }) {
    const prefix = args.join(' ');
    if (!prefix) {
      return `Your current prefix is \`${await client.getPrefix(msg.author.id)}\`.`;
    }

    await client.setPrefix(msg.author.id, prefix);
    return `Your prefix was successfully set to \`${prefix}\`.`;
  }

  get props () {
    return {
      triggers: [ 'prefix', 'setprefix' ]
    };
  }
};
