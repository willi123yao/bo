module.exports = async function raidProtection (msg) {
  const mentionCount = msg.mentions
    .filter(mention => !mention.bot)
    .length;

  if (mentionCount > 8) {
    msg.member.ban(0, 'Mass pinging');
  }
};
