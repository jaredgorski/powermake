const shared = require('../shared');

function logHandler(proc, logx) {
  if (proc.stdout) {
    console.log(logx.logData.message);
  }
}

module.exports = {logHandler}
