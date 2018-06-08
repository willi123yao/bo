// DSL needs hackbans but Bo was built to only work on one server
// so we have a seperate processor to handle a single `.hackban` command for DSL
// in the future, Bo should be rewritten to support multiple guilds

module.exports = async function DSLHackban (msg) {
  if (
    msg.channel.guild.id === this.config.dslID &&
    msg.content.startsWith('.hackban') &&
    msg.member.roles.includes(this.config.dslMods)
  ) {
    const [ , id ] = msg.content.split(/ +/g);
    if (!id) {
      return msg.channel.createMessage('give id ples');
    }

    if (!(/\d{17,19}/).test(id)) {
      return msg.channel.createMessage('invalid id hoe');
    }

    const res = await msg.channel.guild.banMember(id, 7, `Hackbanned by ${msg.author.username}`)
      .then(() => ':eye: :nose: :eye:\n     :lips:\n:ok_hand: :ok_hand: :weary: :weary:')
      .catch(e => `:x: :weary: :x: :x: ${e.message}`);

    msg.channel.createMessage(res);

    return true;
  }
};
