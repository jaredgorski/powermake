const {monitorHandler} = require('./monitor');

function outputHandler(proc, data, type) {
  monitorHandler(proc, data);
}

module.exports = {outputHandler}
