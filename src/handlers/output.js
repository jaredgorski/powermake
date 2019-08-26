const {monitorHandler} = require('./monitor');

/**
 * Handles log output from the current process.
 * @param {object} proc  The relevant process
 * @param {Buffer} data  The current process data buffer
 * @param {string} type  The type of output
 */
function outputHandler(proc, data, type) {
  const logData = {
    data,
    message: data.toString().trim(),
    snippets: {},
    type,
  };

  monitorHandler(proc, logData);
}

module.exports = {outputHandler};
