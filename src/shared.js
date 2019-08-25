const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const {
  configFile,
  defaultConfig,
  demoProfile,
  demoProfileDir,
  demoProfileFile,
  pmHomeDir,
  profileExtension,
} = require('./defaults');

const getProfileFilepath = filepath => path.join(pmHomeDir, filepath + profileExtension);

function buildConfig() {
  let config = defaultConfig;
  let profile = demoProfile;

  if (!fs.existsSync(pmHomeDir)) {
    fs.mkdirSync(pmHomeDir);
  }

  if (fs.existsSync(configFile)) {
    config = yaml.load(fs.readFileSync(configFile, 'utf-8'));
  } else {
    fs.writeFileSync(configFile, yaml.dump(defaultConfig));
  }

  const profileFile = getProfileFilepath(config.profile);
  if (!fs.existsSync(profileFile)) {
    if (!fs.existsSync(demoProfileDir)) {
      fs.mkdirSync(demoProfileDir);
    }

    if (!fs.existsSync(demoProfileFile)) {
      fs.writeFileSync(demoProfileFile, yaml.dump(demoProfile));
    }
  }
}

function getConfig() {
  let config;
  let profile;

  try {
    config = yaml.load(fs.readFileSync(configFile, 'utf-8'));
  } catch (error) {
    throw new Error('> POWERMAKE: ERR: Misconfigured config.');
  }

  const profileFile = getProfileFilepath(config.profile);
  try {
    profile = yaml.load(fs.readFileSync(profileFile, 'utf-8'));
  } catch (error) {
    throw new Error('> POWERMAKE: ERR: Misconfigured profile.');
  }

  return Object.assign({}, config, profile);
}

const shared = {
  buildConfig,
  config: () => getConfig(),
};

module.exports = shared;
