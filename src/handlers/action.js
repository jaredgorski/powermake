const actions = require('../actions/index');
const {logHandler} = require('./log');

function actionHandler(toExec, proc, logData) {
  const logx = {
    logData,
    logHandler,
  };

  if (toExec.length) {
    for (const action of toExec) {
      actions[action].call(null, proc, logx);
    }
  } else {
    actions['logger'].call(null, proc, logx);
  }
}

module.exports = {actionHandler}
