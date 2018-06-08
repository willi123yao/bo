const constructTimeComponent = (component) =>
  component
    .replace(/\[/g, '(?:')
    .replace(/\]/g, ')*');

const timeRegex = RegExp('(\\d+) *(' + [
  's[ec[ond[s]]]',
  'm[in[ute[s]]]',
  'h[our[s]]',
  'd[ay[s]]'
].map(constructTimeComponent).join('|') + ')');

const times = {
  s: 1000,
  m: 60000,
  h: 3600000,
  d: 86400000
};

module.exports = function parseTime (input) {
  const parsed = input.match(timeRegex);
  if (!parsed) return null;

  const [ , digit, timeUnit ] = parsed;
  return (
    (Number(digit) * times[timeUnit[0]]) + Date.now()
  );
};
