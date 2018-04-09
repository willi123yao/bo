console.log('Initializing Avocado spread sequence...');

const Avocado = require(`${__dirname}/src/Avocado.js`);
const config = require(`${__dirname}/config.json`);

// eslint-disable-next-line no-new
new Avocado(config, {
  getAllUsers: true
});
