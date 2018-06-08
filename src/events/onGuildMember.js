module.exports = async function onGuildMember (_, member) {
  if ((member.nick || member.username).toLowerCase()[0].localeCompare('0') === -1) {
    member.edit({ nick: 'bad hoister' });
  }
};
