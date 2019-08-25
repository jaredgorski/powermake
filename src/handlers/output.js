const {monitorHandler} = require('./monitor');

/**
 * Handles log output from the current process.
 * @param {object} proc  The relevant process
 * @param {Buffer} data  The current process data buffer
 */
function outputHandler(proc, data) {
  monitorHandler(proc, data);
}

module.exports = {outputHandler};
