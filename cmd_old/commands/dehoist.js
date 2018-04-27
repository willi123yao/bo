const sleep = (ms) => new Promise(r => setTimeout(r, ms));

module.exports = async function dehoist (msg) {
  const hoisters = msg.channel.guild.members.filter(u => {
    const username = u.nick || u.username;
    return username.toLowerCase().codePointAt(0) < 48; // codepoint of '0'
  });

  if (!hoisters[0]) {
    return 'No hoisters to de-hoist.';
  }

  msg.channel.createMessage(`Dehoisting ${hoisters.length} users.`);
  for (const hoister of hoisters) {
    this.dehoist(hoister)
      .catch(e =>
        msg.channel.createMessage(`Failed to dehoist ${hoister.username} (\`${hoister.id}\`): ${e.message}`)
      );
    await sleep(1100);
  }

  return `Finished, ${msg.author.mention}.`;
};
