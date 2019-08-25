const {builtin} = require('./builtin');
const cp = require('child_process');
const shared = require('../shared');

function buildConfigActions() {
  const actions = {};

  for (const action of shared.config().actions) {
    const {name, type} = action;

    switch(type) {
      case 'shell':
        const {command} = action;

        if (command) {
          actions[name] = (proc, logx) => {
            logx.logHandler(proc, logx.logData);
            return handleShellType(command);
          };
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

function handleShellType(command) {
  const sub = cp.spawn('sh', ['-c', command]);

  sub.stdout.on('data', data => {
    console.log(data.toString());
  });

  sub.stderr.on('data', data => {
    console.error(data.toString());
  });
}

module.exports = Object.assign({}, builtin, buildConfigActions());
