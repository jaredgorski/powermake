const fs = require('fs');
const shared = require('../shared');
const {procsHandler} = require('../handlers/procs');
const path = require('path');
const spawn = require('child_process').spawn;

async function make(argv) {
  let configProcesses = shared.config().processes;
  let argProcess;

  if (argv.process) {
    argProcess = configProcesses.filter(p => p.name === argv.process);
  }

  const processesToInit = argProcess || configProcesses;
  const procs = {};

  for (const cfgProc of configProcesses) {
    const {name, command, cwd, stdout} = cfgProc;

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
      describe:
        'Specify an individual process to run',
      type: 'string',
    });

    yargs.example(
      'pm make'
    );

    yargs.example(
      'pm make -p myprocess'
    );

    return yargs;
  },
};

