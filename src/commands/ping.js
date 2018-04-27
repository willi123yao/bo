module.exports = class Ping {
  async execute (msg, args) {
    return `${msg.channel.guild.shard.latency}ms`;
  }

  get props () {
    return {
      triggers: ['ping', 'pong'],
      usage: 'no',
      description: 'no'
    };
  }
};
