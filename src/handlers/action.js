const {actions, RegisteredActions} = require('../actions/index');
const {logHandler} = require('./log');

/**
 * Handles the execution of triggered actions.
 * @param {Array} execActions  The actions triggered by the monitors
 * @param {object} proc  The relevant process
 * @param {object} logData  An object containing relevant log data
 */
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

/**
 * Filters actions and prepares them for execution.
 * @param {Array} execActions  The actions triggered by the monitors
 * @returns {Set} actionSet
 */
function getActionSet(execActions) {
  execActions.unshift(RegisteredActions.logger);
  const actionSet = new Set(execActions);

  if (actionSet.has(RegisteredActions.silence)) {
    actionSet.delete(RegisteredActions.logger);
  }

  return actionSet;
}

module.exports = {actionHandler};
