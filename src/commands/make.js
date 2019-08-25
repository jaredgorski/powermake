const fs = require('fs');
const path = require('path');
const shared = require('../shared');
const spawn = require('child_process').spawn;
const {procsHandler} = require('../handlers/procs');

/**
 * Executes the make command.
 * @param {Array} argv  The args array.
 */
async function make(argv) {
  const configProcesses = shared.config().processes;

  let argProcess;
  if (argv.process) {
    argProcess = configProcesses.filter(p => p.name === argv.process);
  }

  const processesToInit = argProcess || configProcesses;

  const procs = {};
  for (const procToInit of processesToInit) {
    const {name, command, cwd, stdout} = procToInit;

    if (cwd) {
      const cwdPath = path.normalize(cwd).replace('~', process.env.HOME);

      if (fs.existsSync(cwdPath)) {
        process.chdir(cwdPath);
      } else {
        throw new Error('Misconfigured process: cwd path does not exist.');
      }
    }

    const child = spawn('sh', ['-c', command]);

    procs[name] = {name, stdout, child};
  }

  procsHandler(procs);
}

module.exports = {
  action: make,
  description: `Initiate dev environment based on configuration`,
  name: 'make',
  builder(yargs) {
    yargs.option('-p', {
      alias: 'process',
      describe: 'Specify an individual process to run',
      type: 'string',
    });

    yargs.example('pwm make');

    yargs.example('pwm make -p myprocess');

    return yargs;
  },
};
