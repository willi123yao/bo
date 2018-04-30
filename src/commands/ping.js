module.exports = class Ping {
  async execute ({ msg: { channel: { guild: { shard } } } }) { // HOW FAR DO I GO
    return `${shard.latency}ms`;
  }

  get props () {
    return {
      triggers: ['ping'],
      usage: 'no',
      description: 'no'
    };
  }
};
