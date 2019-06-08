import * as vscode from 'vscode'
import * as CR from 'typings'

import tutorialSetup from '../../services/tutorialSetup'
import { isEmptyWorkspace, openReadme } from '../workspace'
import { setWorkspaceRoot } from '../../services/node'
import { setStorage } from '../../editor/storage'

/*
new
if current workspace is empty, use it
if not, open a new folder then start
*/

// async function continueTutorial() {
//   // TODO: verify that tutorial is loaded in workspace
//   // TODO: verify progress
//   // TODO: verify setup
//   await loadProgressPosition()
//   await openReadme()
// }

async function newTutorial(tutorial: CR.Tutorial) {
  // if workspace isn't empty, clear it out if given permission
  const isEmpty: boolean = await isEmptyWorkspace()
  if (!isEmpty) {
    // eslint-disable-next-line
    const options = ['Open a new folder', 'I\'ll clear the files and folders myself']
    const shouldOpenFolder = await vscode.window.showQuickPick(options)
    if (shouldOpenFolder === options[0]) {
      await vscode.commands.executeCommand('vscode.openFolder')
    }
  }

  await tutorialSetup(tutorial)
  await openReadme()
}


export default async function start(context: vscode.ExtensionContext): Promise<void> {
  console.log('start', context)


  return;

  // const modes = ['New']

  // const canContinue = await validateCanContinue()
  // if (canContinue) {
  //   modes.push('Continue')
  // }

  // const selectedMode: string | undefined = await vscode.window.showQuickPick(modes)

  // if (!selectedMode) {
  //   throw new Error('No mode selected')
  //   return
  // }

  // interface TutorialQuickPickItem extends vscode.QuickPickItem {
  //   id: string
  // }

  // // load tutorial summaries
  // const tutorialsData: { [id: string]: CR.TutorialSummary } = await api({
  //   resource: 'getTutorialsSummary',
  // })
  // const selectableTutorials: TutorialQuickPickItem[] = Object.keys(tutorialsData).map(id => {
  //   const tutorial = tutorialsData[id]
  //   return {
  //     label: tutorial.title,
  //     description: tutorial.description,
  //     // detail: '', // optional additional info
  //     id,
  //   }
  // })
  // const selectedTutorial: TutorialQuickPickItem | undefined = await vscode.window.showQuickPick(selectableTutorials)

  // if (!selectedTutorial) {
  //   throw new Error('No tutorial selected')
  // }

  // // load specific tutorial
  // const tutorial: CR.Tutorial | undefined = await fetch({
  //   resource: 'getTutorial',
  //   params: { id: selectedTutorial.id },
  // })

  // if (!tutorial) {
  //   throw new Error('No tutorial found')
  // }

  // switch (selectedMode) {
  //   // new tutorial
  //   case modes[0]:
  //     await newTutorial(tutorial)
  //     break
  //   // continue
  //   case modes[1]:
  //     await continueTutorial()
  //     break
  // }

  // // setup hook to run tests on save


  // TODO: start
}
