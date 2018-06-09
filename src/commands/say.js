module.exports = class SayCommand {
  async execute ({ args }) {
    return args.join(' ') || 'You need to enter something for me to repeat!';
  }

  get props () {
    return {
      triggers: [ 'say', 'repeat', 's' ],
      usage: '{command} <message>',
      description: 'Repeats a message through the bot.'
    };
  }
};
