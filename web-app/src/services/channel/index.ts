import { Action } from 'typings'

declare let acquireVsCodeApi: any

interface ReceivedEvent {
  data: Action
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

  public machineSend = (action: Action | string) => {
    /* implemented by `setMachineSend` in router on startup */
  }
  public editorSend = (action: Action) => {
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

    console.log(`CLIENT RECEIVE: ${action.type}`, action)

    // messages from core
    switch (action.type) {
      case 'ENV_LOAD':
      case 'AUTHENTICATED':
      case 'TUTORIAL_LOADED':
      case 'NEW_TUTORIAL':
      case 'TUTORIAL_CONFIGURED':
      case 'CONTINUE_TUTORIAL':
      case 'TEST_PASS':
      case 'TEST_FAIL':
      case 'TEST_RUNNING':
      case 'TEST_ERROR':
      case 'COMMAND_START':
      case 'COMMAND_SUCCESS':
      case 'COMMAND_FAIL':
        this.machineSend(action)
        return
      default:
        if (action.type) {
          console.warn(`Unknown received action ${action.type}`, action)
        }
    }
  }
}

export default new Channel()
