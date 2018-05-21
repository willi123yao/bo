const { Client } = require('eris');
const { readdir } = require('fs');
const Endpoints = require('eris/lib/rest/Endpoints');

const events = require(`${__dirname}/events`);
const getDB  = require(`${__dirname}/db.js`);

class Bot extends Client {
  constructor (config, opts) {
    super(config.token, opts);
    this.config = config;
    this.init();
  }

  async init () {
    this.connect();
    this.loadCommands();
    this.db = await getDB();

    this
      .on('ready', events.onReady)
      .on('messageCreate', events.onMessageCreate)
      .on('guildMemberUpdate', events.onGuildMember)
      .on('guildMemberAdd', events.onGuildMember);
  }

  async loadCommand (commandName) {
    const Command = new (require(`${__dirname}/commands/${commandName}`))();
    for (const trigger of Command.props.triggers) {
      this.commands.set(trigger, Command);
    }
  }

  loadCommands () {
    return new Promise((resolve, reject) => {
      this.commands = new Map();
      readdir(`${__dirname}/commands`, (err, commands) => {
        if (err) {
          reject(err);
        }

        resolve(commands.map(this.loadCommand, this));
      });
    });
  }

  // Various miscellaneous methods used throughout the bot are all just thrown in here
  async dm ([ action, actionPT ], userID, mod, reason) {
    const DMChannel = await this.getDMChannel(userID);
    const color = ({
      ban: 0xFF0000,
      kick: 0xFFFF00,
      mute: 0xFFFF00,
      shitpostMute: 0xFFFF00
    })[action];

    return DMChannel.createMessage({ embed: {
      color,
      title: `You were ${actionPT} from Discord Bot List.`,
      fields: [
        { name: 'Moderator', value: mod },
        { name: 'Reason', value: reason }
      ],
      timestamp: new Date()
    }});
  }

  fetchUser (id) {
    if (this.users.has(id)) {
      return this.users.get(id);
    } else {
      return this.requestHandler.request('GET', Endpoints.USER(id), true)
        .catch(e => {
          if (e.message.includes('Unknown User')) {
            return null;
          }
        });
    }
  }

  async dehoist (hoister) {
    const username = (hoister.nick || hoister.username).split('');

    username.unshift(String.fromCharCode(55343) + String.fromCharCode(56482));

    if (username.length > 31) {
      username.splice(31 - username.length);
    }

    return hoister.edit({ nick: username.join('') });
  }

  async getPrefix (id) {
    const res = await this.db.collection('prefixes').findOne({ id });

    return res
      ? res.prefix
      : this.config.defaultPrefix;
  }

  async setPrefix (id, prefix) {
    const existingPrefix = await this.db.collection('prefixes').findOne({ id });
    if (existingPrefix) {
      return this.db.collection('prefixes').updateOne({ id }, { $set: { prefix } });
    } else {
      return this.db.collection('prefixes').insertOne({ id, prefix });
    }
  }
}

module.exports = Bot;
