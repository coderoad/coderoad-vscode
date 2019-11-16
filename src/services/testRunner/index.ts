import node from '../../services/node'
import { getOutputChannel } from '../../editor/outputChannel'
import parser from './parser'
// import { setLatestProcess, isLatestProcess } from './throttle'

export interface Payload {
  stepId: string
}

interface Callbacks {
  onSuccess(payload: Payload): void
  onFail(payload: Payload, message: string): void
  onRun(payload: Payload): void
  onError(payload: Payload): void
}

interface TestRunnerConfig {
  command: string
}

const createTestRunner = (config: TestRunnerConfig, callbacks: Callbacks) => {
  const outputChannelName = 'TEST_OUTPUT'

  return async (payload: Payload, onSuccess?: () => void): Promise<void> => {
    console.log('------------------- RUN TEST -------------------')

    // flag as running
    callbacks.onRun(payload)

    let result: { stdout: string | undefined; stderr: string | undefined }
    try {
      result = await node.exec('npm test')
    } catch (err) {
      console.log(err)
      result = { stdout: err.stdout, stderr: err.stack }
    }
    const { stdout, stderr } = result

    const tap = parser(stdout || '')
    if (stderr) {
      // failures also trigger stderr
      if (stdout && stdout.length && !tap.ok) {
        const message = tap.message ? tap.message : ''
        callbacks.onFail(payload, message)
        return
      } else {
        callbacks.onError(payload)
        // open terminal with error string
        const channel = getOutputChannel(outputChannelName)
        channel.show(false)
        channel.appendLine(stderr)
        return
      }
    }

    // success!
    if (tap.ok) {
      callbacks.onSuccess(payload)
      if (onSuccess) {
        onSuccess()
      }
    } else {
      // should never get here
      callbacks.onError(payload)
    }
  }
}

export default createTestRunner
