// moderatorID, expiryDate, userID, action
const { parseTime } = require(`${__dirname}/../../../utils`);
const argumentRX = /^-r(?:eason)* +(\d+) *([^]+?) *\| *`?([^]+?)`?$/;

module.exports = async function timedActions (msg) {
  const match = msg.content.match(argumentRX);
  if (!match) return;

  const [ , caseNumber, , argument ] = match;

  const DMChannel = await this.getDMChannel(msg.author.id);
  const incident = await this.db.getIncidentByCase(caseNumber);

  const parsedTime = parseTime(argument);
  if (!parsedTime) {
    return DMChannel.createMessage(`I was unable to parse ${argument} as a valid time argument. Go yell at Aeth if you think this is wrong`);
  }

  await this.db.createTimedAction({
    moderatorID: msg.author.id,
    expiryDate: parsedTime,
    userID: incident.id,
    action: incident.a,
    caseNumber
  });

  DMChannel.createMessage(`Successfully scheduled to un${incident.a.toLowerCase().slice(0, -1)} <@${incident.id}> at ${new Date(parsedTime).toLocaleString()}.`);
};
