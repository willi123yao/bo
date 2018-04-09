module.exports = async function invis () {
  await this.editStatus('invisible');
  return '☑';
};
