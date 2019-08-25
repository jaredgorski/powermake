const cp = require('child_process');
const shared = require('../shared');
const {builtin, BuiltinActions} = require('./builtin');

const CustomActions = {};

/**
 * Builds and returns the methods for the actions defined in the config.
 */
function buildConfigActions() {
  const actions = {};

  for (const action of shared.config().actions) {
    const {name, type} = action;

    switch (type) {
      case 'shell':
        if (action.command) {
          actions[name] = (/* proc, logx */) => {
            return handleShellType(action.command);
          };

          CustomActions[name] = name.toString();
        } else {
          throw new Error(`No shell command configured for ${name}.`);
        }

        break;
      default:
        throw new Error(`Misconfigured action: ${name}`);
    }
  }

  return actions;
}

/**
 * Handles building methods for custom shell actions.
 * @param {string} command  The command to run
 */
function handleShellType(command) {
  const sub = cp.spawn('sh', ['-c', command]);

  sub.stdout.on('data', data => {
    console.log(data.toString());
  });

  sub.stderr.on('data', data => {
    console.error(data.toString());
  });
}

module.exports = {
  actions: Object.assign({}, builtin, buildConfigActions()),
  RegisteredActions: Object.assign({}, CustomActions, BuiltinActions),
};
