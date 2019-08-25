const RegisteredActions = {
  logSuppress: 'logSuppress',
  error: 'error',
  pmexit: 'pmexit',
  kill: 'kill',
};

const builtin = {
  error: (proc, logx) => {
    logx.logHandler(proc, logx.logData);
    logSnippet('error', logx);

    throw new Error(`> POWERMAKE: ERR: ${logx.logData.snippets.error}`);
  },
  disconnect: (proc, logx) => {
    logx.logHandler(proc, logx.logData);
    logSnippet('disconnect', logx);

    proc.child.disconnect();
    console.log(`> POWERMAKE: Process ${proc.name.toUpperCase()} disconnected`);
  },
  kill: (proc, logx) => {
    logx.logHandler(proc, logx.logData);
    logSnippet('kill', logx);

    proc.child.kill();
    console.log(`> POWERMAKE: Process ${proc.name.toUpperCase()} killed`);
  },
  logger: (proc, logx) => {
    logx.logHandler(proc, logx.logData);
  },
  logSuppress: () => {
    // no-op
  },
  pmexit: (proc, logx) => {
    logx.logHandler(proc, logx.logData);
    logSnippet('pmexit', logx);

    console.log(`> POWERMAKE: powermake exited`);
    process.exit();
  },
}

function logSnippet(action, logx) {
  const snippet = logx.logData.snippets[action];

  if (snippet) {
    console.log(`> POWERMAKE: Caught trigger: ${snippet}`);
  }
}

module.exports = {
  builtin,
  RegisteredActions,
}

