module.exports = async function onReady () {
  console.log(`Connected in ${process.uptime().toFixed(2)}s.`);
  this.editStatus('invisible');
};
