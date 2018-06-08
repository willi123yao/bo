const ACTIONS = [
  'Deleted',
  'Kicked',
  'Muted',
  'Declined',
  'Unmuted',
  'Banned',
  'Unbanned'
];

const INCIDENTS_PER_PAGE = 5;

module.exports = class IncidentsCommand {
  async execute ({ client, msg, args: [ id, page = 1 ] }) {
    const argument = (msg.mentions[0] || { id }).id;
    if (!argument) {
      return 'Specify an ID/mention or heck off, nerd';
    }
    if (isNaN(argument)) {
      return 'First argument must be an ID / mention.';
    }

    page--; // zero based indexing haha ok

    const res = await client.db.getIncidentsByID(argument);

    if (!res[0]) {
      return `No incidents found for \`${argument}\`. Make sure you're querying by ID or mention.`;
    }

    const pages = res
      .slice(page * INCIDENTS_PER_PAGE, (page * INCIDENTS_PER_PAGE) + INCIDENTS_PER_PAGE)
      .map(incident => [
        incident.n ? `#${incident.n}` : '',
        `${ACTIONS[incident.a]} by ${incident.m} (${new Date(incident.t * 1000).toLocaleDateString()})`,
        `Reason: ${incident.r}`
      ].join('\n'));

    return {
      title: `Incidents for ${argument}`,
      description: pages[0] ? pages.join('\n\n') : `No incidents found on this page. Feel free to expand the list.`,
      footer: { text: `Page ${page + 1}/${Math.ceil(res.length / INCIDENTS_PER_PAGE)} (${res.length} incidents total)` }
    };
  }

  get props () {
    return {
      triggers: [ 'incidents', 'whyismybotmuted' ],
      description: 'hello why is my bot muted???????????',
      usage: '{command} <id/mention> [pageNumber (defaults to 1)]'
    };
  }
};
