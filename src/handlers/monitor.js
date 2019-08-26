const shared = require('../shared');
const {actionHandler} = require('./action');

/**
 * Handles monitors for the current process data.
 * @param {object} proc  The relevant process
 * @param {object} logData  An object containing relevant log data
 */
function monitorHandler(proc, logData) {
  const execActions = [];

  for (const monitor of shared.config().monitors) {
    const {process, triggers, actions} = monitor;

    if (proc.name === process) {
      for (const trigger of Object.keys(triggers)) {
        const potentialPull = require(`./triggers/${trigger}`);
        const {tActions, tSnippets} = potentialPull(
          actions,
          logData,
          triggers[trigger]
        );
        execActions.push(...tActions);
        logData.snippets = Object.assign(logData.snippets, tSnippets);
      }
    }
  }

  actionHandler(execActions, proc, logData);
}

module.exports = {monitorHandler};
