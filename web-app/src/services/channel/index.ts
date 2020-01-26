import { MachineEvent } from '../state/machine'
import { MachineEvent as AuthenticateEvent } from '../state/authenticate'
import { MachineEvent as SelectTutorialEvent } from '../state/selectTutorial'
import { MachineEvent as PlayTutorialEvent } from '../state/playTutorial'

declare let acquireVsCodeApi: any

type SendEvent = MachineEvent | AuthenticateEvent | SelectTutorialEvent | PlayTutorialEvent

interface ReceivedEvent {
  data: SendEvent
}

class Channel {
  constructor() {
    // setup mock if browser only
    // @ts-ignore
    if (!window.acquireVsCodeApi) {
      // @ts-ignore
      require('./mock')
    }

    // Loads VSCode webview connection with editor
    const editor = acquireVsCodeApi()

    this.editorSend = editor.postMessage
  }

  public machineSend = (event: SendEvent) => {
    /* implemented by `setMachineSend` in router on startup */
  }
  public editorSend = (event: SendEvent) => {
    /* */
  }

  public setMachineSend = (send: any) => {
    this.machineSend = send
  }
  public receive = (event: ReceivedEvent) => {
    // NOTE: must call event.data, cannot destructure. VSCode acts odd
    const action = event.data

    // @ts-ignore // ignore browser events from plugins
    if (action.source) {
      return
    }

    this.machineSend(action)
  }
}

export default new Channel()
