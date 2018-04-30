module.exports = class InvisCommand {
  async execute ({ client }) {
    client.editStatus('invisible');
    return '☑';
  }

  get props () {
    return {
      triggers: ['invis', 'hide'],
      usage: 'no uuuxcvasdf',
      description: 'hiiiierwer3'
    };
  }
};
