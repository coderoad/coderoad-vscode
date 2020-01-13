import * as vscode from 'vscode'

interface Props {
  message: string
}

const notify = ({ message }: Props) => {
  vscode.window.setStatusBarMessage(message, 15000)
}

export default notify
