const sleep = (ms) => new Promise(r => setTimeout(r, ms));

module.exports = class DehoistCommand {
  async execute ({ msg: { channel, author }, client: { dehoist } }) {
    await channel.guild.fetchAllMembers();
    const hoisters = channel.guild.members.filter(u => {
      const username = u.nick || u.username;
      return username[0].localeCompare('0') === -1;
    });

    if (!hoisters[0]) {
      return 'No hoisters to de-hoist.';
    }

    channel.createMessage(`Dehoisting ${hoisters.length} users.`);
    for (const hoister of hoisters) {
      hoister.edit({ nick: 'hoister no hoisting' })
        .catch(e =>
          channel.createMessage(`Failed to dehoist ${hoister.username} (\`${hoister.id}\`): ${e.message}`)
        );
      await sleep(1100);
    }

    return `Finished, ${author.mention}.`;
  }

  get props () {
    return {
      triggers: ['dehoist'],
      usage: '{command}',
      description: 'Dehoist everyone if auto dehoist fails'
    };
  }
};
