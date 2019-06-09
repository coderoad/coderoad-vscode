// import panel from '../views/Panel'
import * as CR from 'typings'

export const onSend = (action: CR.Action) => {
  // if (!panel || !panel.currentPanel) {
  //   throw new Error('No valid panel available')
  // }
  // panel.currentPanel.postMessage(action)
}

export const onReceive = (action: CR.Action) => {
  console.log(`RECEIVED: ${JSON.stringify(action)}`)
}
