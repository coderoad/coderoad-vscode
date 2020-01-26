import * as CR from 'typings'
import * as G from 'typings/graphql'
import { EditorEvent, ClientEvent } from 'typings/events'

declare let acquireVsCodeApi: any

interface ReceivedEvent {
  data: ClientEvent
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

  public machineSend = (event: ClientEvent) => {
    /* implemented by `setMachineSend` in router on startup */
  }
  public editorSend = (event: EditorEvent) => {
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
