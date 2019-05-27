import * as vscode from 'vscode'
import { TestView } from './progress/treeDataProvider'

const createViews = (context: vscode.ExtensionContext) => {
  // TODO: level/stage select
  // TODO: summary view
  // TODO: instruction view
  // docs: https://code.visualstudio.com/api/extension-guides/tree-view
  // vscode.window.registerTreeDataProvider('nodeDependencies', new TreeDataProvider(context.workspace))

  new TestView(context);
}

export default createViews
