const jobs = require(`${__dirname}/jobs`);

module.exports = async function onceReady () {
  for (const job of jobs) {
    job.func.call(this);
    setInterval(job.func.bind(this), job.interval);
  }
};
