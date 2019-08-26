const logger = require('../util/logger');

/**
 * Handles process output logging.
 * @param {object} proc  The relevant process
 * @param {object} logx  The logging object
 */
function logHandler(proc, logx) {
  if (!proc.silent) {
    logger.info(logx.logData);
  }
}

module.exports = {logHandler};
