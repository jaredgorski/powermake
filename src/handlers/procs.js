const {outputHandler} = require('./output');

/**
 * Handles procs and forwards their output.
 * @param {object} procs  An object containing the current processes
 */
function procsHandler(procs) {
  for (const key of Object.keys(procs)) {
    const proc = procs[key];

    if (proc && proc.child) {
      proc.child.stdout.on('data', data => {
        outputHandler(proc, data, 'out');
      });

      proc.child.stderr.on('data', data => {
        outputHandler(proc, data, 'err');
      });
    }
  }
}

module.exports = {procsHandler};
