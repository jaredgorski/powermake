/**
 * Handles process output logging.
 * @param {object} proc  The relevant process
 * @param {object} logx  The logging object
 */
function logHandler(proc, logx) {
  if (!proc.silent) {
    console.log(logx.logData.message);
  }
}

module.exports = {logHandler};
