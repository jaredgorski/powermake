const shared = require('../shared');

function logHandler(proc, logData) {
  if (proc.stdout) {
    console.log(logData.message);
  }
}

module.exports = {logHandler}
