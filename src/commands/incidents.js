const ACTIONS = [
  'Deleted',
  'Kicked',
  'Muted',
  'Declined',
  'Unmuted',
  'Banned'
];

const INCIDENTS_PER_PAGE = 5;

module.exports = class IncidentsCommand {
  async execute ({ client, msg, args: [ id, page = 1 ] }) {
    const argument = (msg.mentions[0] || { id }).id;
    if (!argument) {
      return 'Specify an ID/mention or heck off, nerd';
    }

    page--;

    const res = await client.db.collection('incidents').find({ id: argument }).toArray();
    const pages = res
      .slice(page * INCIDENTS_PER_PAGE, (page * INCIDENTS_PER_PAGE) + INCIDENTS_PER_PAGE)
      .map(incident => [
        incident.n ? `#${incident.n}` : '',
        `${ACTIONS[incident.a]} by ${incident.m} (${new Date(incident.t * 1000).toLocaleDateString()})`,
        `Reason: ${incident.r}`
      ].join('\n'));

    return {
      title: `Incidents for ${argument}`,
      description: pages[0] ? pages.join('\n') : `No incidents found on this page. Feel free to expand the list.`,
      footer: { text: `Page ${page + 1}/${Math.ceil(res.length / INCIDENTS_PER_PAGE)}` }
    };
  }

  get props () {
    return {
      triggers: [ 'incidents', 'whyismybotmuted' ]
    };
  }
};
