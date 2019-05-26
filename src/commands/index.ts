import * as vscode from 'vscode'

import runTest from './runTest'
import tutorialLoad from './tutorialLoad'
import loadSolution from './loadSolution'
// import quit from './quit'

const COMMANDS = {
  RUN_TEST: 'coderoad.test_run',
  TUTORIAL_LOAD: 'coderoad.tutorial_load',
  TUTORIAL_SETUP: 'coderoad.tutorial_setup',
  LOAD_SOLUTION: 'coderoad.solution_load',
  // QUIT: 'coderoad.quit',
}

export default (context: vscode.ExtensionContext): void => {
  const commands = {
    [COMMANDS.TUTORIAL_LOAD](): void {
      tutorialLoad(context)
    },
    [COMMANDS.RUN_TEST]: runTest,
    [COMMANDS.LOAD_SOLUTION]: loadSolution,
    // [COMMANDS.QUIT]: () => quit(context.subscriptions),
  }

  for (const cmd in commands) {
    const command: vscode.Disposable = vscode.commands.registerCommand(cmd, commands[cmd])
    context.subscriptions.push(command)
  }
}
