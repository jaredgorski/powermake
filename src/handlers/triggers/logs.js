function logsTrigger(actions, logData, trigger) {
  const {includesString, includesRegex} = trigger;
  const tActions = [];
  const tSnippets = {};

  for (const action of actions) {
    switch(true) {
      case includesString && logData.message.includes(includesString):
        tActions.push(action);
        tSnippets[action] = getTriggerSnippet(logData.data, includesString);
        break;
      case includesRegex && logData.message.match(includesRegex):
        tActions.push(action);
        tSnippets[action] = getTriggerSnippet(logData.data, includesRegex);
        break;
    }
  }

  return {tActions, tSnippets};
}

function getTriggerSnippet(data, substr) {
  const str = data.toString().trim();
  const match = str.match(substr)[0];
  const index = str.search(match);
  const start = Math.max(0, (index - 4));
  const end = (index + match.length + 20);
  const snippet = '... ' + 
    str.substring(start, end).replace(match, `[${match}]`)
    + ' ...';

  return snippet;
}

module.exports = logsTrigger;
