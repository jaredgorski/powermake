const logger = require('../util/logger');

const BuiltinActions = {
  disconnect: 'disconnect',
  error: 'error',
  kill: 'kill',
  logger: 'logger',
  pwmexit: 'pwmexit',
  silence: 'silence',
};

const builtin = {
  disconnect: (proc, logx) => {
    logTriggerSnippet('disconnect', logx);
    proc.child.disconnect();
    logger.info(`Process ${proc.name.toUpperCase()} disconnected`);
  },
  error: (proc, logx) => {
    logTriggerSnippet('error', logx);
    logger.info({
      message: `Process ${proc.name.toUpperCase()} disconnected`,
      isErr: true,
    });
    throw new Error(logx.logData.snippets.error);
  },
  kill: (proc, logx) => {
    logTriggerSnippet('kill', logx);
    proc.child.kill();
    logger.info(`Process ${proc.name.toUpperCase()} killed`);
  },
  logger: (proc, logx) => {
    logx.logHandler(proc, logx);
  },
  pwmexit: (proc, logx) => {
    logTriggerSnippet('pwmexit', logx);
    logger.info(`pwm exited`);
    process.exit();
  },
  silence: () => {
    // no-op, fulfilled in action handler
  },
};

/**
 * Handles logging of trigger snippets.
 * @param {string} action  The action whose snippet to log
 * @param {object} logx  The logging object
 */
function logTriggerSnippet(action, logx) {
  const snippet = logx.logData.snippets[action];

  if (snippet) {
    logger.info(`Caught trigger: ${snippet}`);
  }
}

module.exports = {
  builtin,
  BuiltinActions,
};
