const { MongoClient } = require('mongodb');

module.exports = async function getDB () {
  const db = await MongoClient.connect('mongodb://127.0.0.1:27017')
    // bo uses the verification helper's database because incidents were originally a dblvh feature
    // todo: merge dblvh and bo or seperate database instances
    .then(client => client.db('dblvh'))
    .catch(e => {
      if (e.message.includes('ECONNREFUSED')) {
        console.error(`Failed to connect to MongoDB: ${e.message}\nExiting...`, 'error');
        process.exit(1);
      }
    });

  const [ prefixes, incidents, timedActions ] = [ 'prefixes', 'incidents', 'timedActions' ].map(table => db.collection(table));

  // every single db method used in the whole project is below
  // todo: split tables into files
  return {
    async getPrefix (id) {
      const res = await prefixes.findOne({ id });

      return res
        ? res.prefix
        : this.config.defaultPrefix;
    },

    async setPrefix (id, prefix) {
      const existingPrefix = await prefixes.findOne({ id });
      if (existingPrefix) {
        return prefixes.updateOne({ id }, { $set: { prefix } });
      } else {
        return prefixes.insertOne({ id, prefix });
      }
    },

    getIncidentsByID (id) {
      return incidents
        .find({ id })
        .sort({ t: -1 })
        .toArray();
    },

    getIncidentByCase (caseNumber) {
      return incidents.findOne({ n: caseNumber });
    },

    createTimedAction (options) {
      return timedActions.insertOne(options);
    },

    getExpiredTimedActions () {
      return timedActions.find({
        expiryDate: {
          $lt: Date.now()
        }
      }).toArray();
    },

    deleteExpiredTimedAction (_id) {
      return timedActions.removeOne({ _id });
    }
  };
};
