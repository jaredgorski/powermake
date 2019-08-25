/**
 * Checks log data for triggering conditions and generates relevant action data.
 * @param {Array} actions  An array containing relevant actions
 * @param {object} logData  An object containing relevant log data
 * @param {object} trigger  An object containing relevant triggering conditions
 * @returns {object} triggerData
 */
function logsTrigger(actions, logData, trigger) {
  const {includesString, includesRegex} = trigger;
  const tActions = [];
  const tSnippets = {};

  for (const action of actions) {
    switch (true) {
      case includesString && logData.message.includes(includesString):
        tActions.push(action);
        tSnippets[action] = getTriggerSnippet(logData.data, includesString);
        break;
      case includesRegex && logData.message.match(includesRegex):
        tActions.push(action);
        tSnippets[action] = getTriggerSnippet(logData.data, includesRegex);
        break;
      default:
    }
  }

  return {tActions, tSnippets};
}

/**
 * Checks log data for triggering conditions and generates relevant action data.
 * @param {Buffer} data  The current process data buffer
 * @param {string} substr  The string to match
 * @returns {string} snippet
 */
function getTriggerSnippet(data, substr) {
  const str = data.toString().trim();
  const match = str.match(substr)[0];
  const index = str.search(match);
  const start = Math.max(0, index - 4);
  const end = index + match.length + 20;
  const snippet =
    '... ' + str.substring(start, end).replace(match, `[${match}]`) + ' ...';

  return snippet;
}

module.exports = logsTrigger;
