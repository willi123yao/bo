module.exports = async function onGuildMember (_, member) {
  if ((member.nick || member.username).toLowerCase().codePointAt(0) < 48) { // codepoint of '0'
    this.dehoist(member);
  }
};
