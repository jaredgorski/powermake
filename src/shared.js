const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const {
  configFile,
  defaultConfig,
  demoProfile,
  demoProfileDir,
  demoProfileFile,
  pwmHomeDir,
  profileExtension,
} = require('./defaults');

const getProfileFilepath = filepath =>
  path.join(pwmHomeDir, filepath + profileExtension);

/**
 * Builds the current configuration files.
 */
function buildConfig() {
  let config = defaultConfig;

  if (!fs.existsSync(pwmHomeDir)) {
    fs.mkdirSync(pwmHomeDir);
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

/**
 * Retrieves the current configuration data.
 */
function getConfig() {
  let config;
  let profile;

  try {
    config = yaml.load(fs.readFileSync(configFile, 'utf-8'));
  } catch (error) {
    throw new Error(`Misconfigured config.\n${error}`);
  }

  const profileFile = getProfileFilepath(config.profile);
  try {
    profile = yaml.load(fs.readFileSync(profileFile, 'utf-8'));
  } catch (error) {
    throw new Error(`Misconfigured profile.\n${error}`);
  }

  return Object.assign({}, config, profile);
}

const shared = {
  buildConfig,
  config: () => getConfig(),
};

module.exports = shared;
