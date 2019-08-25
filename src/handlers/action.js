const {actions, RegisteredActions} = require('../actions/index');
const {logHandler} = require('./log');

function actionHandler(execActions, proc, logData) {
  const actionSet = getActionSet(execActions);
  const logx = {
    logData,
    logHandler,
  };

  for (const action of actionSet) {
    actions[action].call(null, proc, logx);
  }
}

function getActionSet(execActions) {
  execActions.unshift(RegisteredActions.logger);
  const actionSet = new Set(execActions);

  if (actionSet.has(RegisteredActions.logSuppress)) {
    actionSet.delete(RegisteredActions.logger);
  }

  return actionSet;
}

module.exports = {actionHandler}
