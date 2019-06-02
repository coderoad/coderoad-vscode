import * as vscode from 'vscode'

// import runTest from './runTest'
import start from './start'
// import loadSolution from './loadSolution'
// import quit from './quit'

const COMMANDS = {
  // TUTORIAL_SETUP: 'coderoad.tutorial_setup',
  START: 'coderoad.start',
  // RUN_TEST: 'coderoad.test_run',
  // LOAD_SOLUTION: 'coderoad.solution_load',
  // QUIT: 'coderoad.quit',
}

export default (context: vscode.ExtensionContext): void => {
  const commands = {
    [COMMANDS.START](): void {
      console.log('TUTORIAL_START')
      start(context)
    },
    // [COMMANDS.RUN_TEST]: runTest,
    // [COMMANDS.LOAD_SOLUTION]: loadSolution,
    // [COMMANDS.QUIT]: () => quit(context.subscriptions),
  }

  for (const cmd in commands) {
    const command: vscode.Disposable = vscode.commands.registerCommand(cmd, commands[cmd])
    context.subscriptions.push(command)
  }
}
