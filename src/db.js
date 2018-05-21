const { MongoClient } = require('mongodb');

module.exports = async function getDB () {
  const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
    .catch(e => {
      if (e.message.includes('ECONNREFUSED')) {
        console.error(`Failed to connect to MongoDB: ${e.message}\nExiting...`, 'error');
        process.exit(1);
      }
    });

  return client.db('dblvh');
};
