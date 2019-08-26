const shared = require('../shared');
const {createLogger, format, transports} = require('winston');

const noLevelFormat = format.printf(({message}) => {
  return `${message}`;
});

const pwmInfoFormat = format.printf(({message, isErr, timestamp = ''}) => {
  let secondary = ' ';

  if (isErr) {
    secondary = '!';
  }

  return `  pwm${secondary} ${timestamp} |  ${message}`;
});

const logFormat = () => {
  const {logging} = shared.config();

  if (logging.sidebar) {
    if (logging.timestamp) {
      return format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
        pwmInfoFormat
      );
    } else {
      return pwmInfoFormat;
    }
  } else {
    return noLevelFormat;
  }
};

const logger = createLogger({
  level: 'info',
  format: logFormat(),
  transports: [new transports.Console()],
});

module.exports = logger;
