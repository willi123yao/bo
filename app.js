console.log('Booting...');

const Bot = require(`${__dirname}/src/Bot.js`);
const config = require(`${__dirname}/config.json`);

// eslint-disable-next-line no-new
new Bot(config, {
  getAllUsers: true
});
