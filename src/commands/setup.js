const path = require('path');
const util = require('util');

const exec = util.promisify(require('child_process').exec);

async function setup(argv) {
  let projectPath;

  if (argv.projectPath) {
    projectPath = path.resolve(argv.projectPath);

    console.log(`powermake project directory set to: ${projectPath}`);
  } else {
    if (argv.packageName) {
      const pkgJsonSearchToken = `"name": "${argv.packageName}"`;
      const searchCmd = `find ~ -path "*/console/package.json" -print 2>/dev/null | xargs grep -d recurse '${pkgJsonSearchToken}'`;
      const {stdout, stderr} = await exec(searchCmd);

      if (stderr) {
        console.error(stderr);
        throw new Error(stderr);
      }

      const parsedPath = stdout.toString().replace(/\/package.json.*/, '').trim();

      projectPath = path.resolve(parsedPath);

      console.log(`powermake project directory set to: ${projectPath}`);
    } else {
      console.error('Please provide a project path (-p) or an NPM package name (--package)');
    }
  }
}

module.exports = {
  action: setup,
  description: `Set configuration necessary for dev environment`,
  name: 'setup',
  builder(yargs) {
    yargs.option('-p', {
      alias: 'projectPath',
      describe:
        'Set project directory by path',
      type: 'string',
    });

    yargs.option('--package', {
      alias: 'packageName',
      describe:
        'Set project directory by NPM package name',
      type: 'string',
    });

    yargs.example(
      'pm setup -p ~/projects/console'
    );

    return yargs;
  },
};

