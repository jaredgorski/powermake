const BuiltinActions = {
  disconnect: 'disconnect',
  error: 'error',
  kill: 'kill',
  logger: 'logger',
  logSuppress: 'logSuppress',
  pmexit: 'pmexit',
};

const builtin = {
  disconnect: (proc, logx) => {
    logTriggerSnippet('disconnect', logx);

    proc.child.disconnect();
    console.log(`> POWERMAKE: Process ${proc.name.toUpperCase()} disconnected`);
  },
  error: (proc, logx) => {
    logTriggerSnippet('error', logx);

    throw new Error(`> POWERMAKE: ERR: ${logx.logData.snippets.error}`);
  },
  kill: (proc, logx) => {
    logTriggerSnippet('kill', logx);

    proc.child.kill();
    console.log(`> POWERMAKE: Process ${proc.name.toUpperCase()} killed`);
  },
  logger: (proc, logx) => {
    logx.logHandler(proc, logx);
  },
  logSuppress: () => {
    // no-op, fulfilled in action handler
  },
  pmexit: (proc, logx) => {
    logTriggerSnippet('pmexit', logx);

    console.log(`> POWERMAKE: powermake exited`);
    process.exit();
  },
}

function logTriggerSnippet(action, logx) {
  const snippet = logx.logData.snippets[action];

  if (snippet) {
    console.log(`> POWERMAKE: Caught trigger: ${snippet}`);
  }
}

module.exports = {
  builtin,
  BuiltinActions,
}

