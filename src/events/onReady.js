module.exports = async function onReady () {
  console.log(`Avocado sandwich made in ${process.uptime().toFixed(2)}s.`);
  this.editStatus('invisible');
};
