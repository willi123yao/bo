module.exports = class InvisCommand {
  async execute ({ client }) {
    client.editStatus('invisible');
    return '☑';
  }

  get props () {
    return {
      triggers: ['invis', 'hide'],
      usage: '{command}',
      description: 'Hides Bo if DAPI decides to give Bo the online status'
    };
  }
};
