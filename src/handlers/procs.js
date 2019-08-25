const {outputHandler} = require('./output');

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

module.exports = {procsHandler}
