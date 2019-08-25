const path = require('path');
const homedir = require('os').homedir();

const pmHomeDir = path.join(homedir, '.powermake/');
const configFile = path.join(pmHomeDir, 'pmconfig.yaml');
const demoProfileDir = path.join(pmHomeDir, 'demo/');
const demoProfileFile = path.join(demoProfileDir, 'pm_demo.pmprofile.yaml');
const profileExtension = '.pmprofile.yaml';

const defaultConfig = {
  profile: 'demo/pm_demo',
};

const demoProfile = {
  processes: [
    {
      name: 'pm_demo',
      command: 'echo \"Selected profile not configered! Triggering: Error\"',
      stdout: true,
    },
  ],
  monitors: [
    {
      process: 'pm_demo',
      triggers: {
        logs: {
          includesString: 'Error',
        },
      },
      actions: [
        'echoMe',
        'kill',
      ],
    },
  ],
  actions: [
    {
      name: 'echoMe',
      type: 'shell',
      command: `echo \"\nTODO: Configure powermake and add profiles at ${pmHomeDir}\n\"`,
    },
  ],
};

module.exports = {
  configFile,
  defaultConfig,
  demoProfile,
  demoProfileDir,
  demoProfileFile,
  pmHomeDir,
  profileExtension,
}
