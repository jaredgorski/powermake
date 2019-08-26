const homedir = require('os').homedir();
const path = require('path');

const pwmHomeDir = path.join(homedir, '.powermake/');
const configFile = path.join(pwmHomeDir, 'pwmrc.yaml');
const profileExtension = '.pwmpr.yaml';
const demoProfileDir = path.join(pwmHomeDir, 'demo/');
const demoProfileFile = path.join(
  demoProfileDir,
  `pwm_demo${profileExtension}`
);

/* eslint-disable */
const defaultConfig = {
  profile: 'demo/pwm_demo',
  logging: {
    timestamp: true,
  },
};

const demoProfile = {
  processes: [
    {
      name: 'pwm_demo',
      command: 'echo "Selected profile not configured! Triggering: Error"',
      silent: false,
    },
  ],
  monitors: [
    {
      process: 'pwm_demo',
      triggers: {
        logs: {
          includesString: 'Error',
        },
      },
      actions: ['echoMe', 'pwmexit'],
    },
  ],
  actions: [
    {
      name: 'echoMe',
      type: 'shell',
      command: `echo "\nTODO: Configure powermake and add profiles at ${pwmHomeDir}\n"`,
    },
  ],
};
/* eslint-enable */

module.exports = {
  configFile,
  defaultConfig,
  demoProfile,
  demoProfileDir,
  demoProfileFile,
  pwmHomeDir,
  profileExtension,
};
