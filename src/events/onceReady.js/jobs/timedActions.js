async function handleTimedActions () {
  const actions = await this.db.getExpiredTimedActions();

  for (const action of actions) {
    switch (action.action) {
      case 2: {
        await this.removeGuildMemberRole(this.config.serverID, action.userID, this.config.mutedRole, `Time's up (see case #${action.caseNumber})`);
      }
    }

    this.db.deleteExpiredTimedAction(action._id);
  }
}

module.exports = {
  func: handleTimedActions,
  interval: 1e3
};
