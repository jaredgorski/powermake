const {buildConfig} = require('./shared');

/**
 * Performs program preparation.
 */
function prepare() {
  try {
    buildConfig();
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Main function.
 */
function execute() {
  prepare();

  const make = require('./commands/make');
  const pkgJson = require('../package.json');
  const setup = require('./commands/setup');
  const yargs = require('yargs');

  const commands = [make, setup].sort((cmd1, cmd2) => {
    return cmd1.name > cmd2.name;
  });

  yargs.usage('Usage: $0 <cmd> [args]');

  commands.forEach(cmd => {
    yargs.command(
      cmd.name,
      cmd.description,
      cmd.builder || cmd.options || Object.create(null)
    );
  });

  const argv = yargs
    .demandCommand(
      1,
      1,
      'Error: no command specified. At least one command is required.',
      'Please specify only one command.'
    )
    .wrap(120)
    .strict()
    .version(`${pkgJson.version}`)
    .help().argv;

  const commandName = argv._[0];
  const command = commands.find(cmd => {
    return cmd.name === commandName;
  });

  command.action(argv);
}

module.exports = execute;
