import node from '../../services/node'
import { getOutputChannel } from '../../editor/outputChannel'
import parser from './parser'
import { setLatestProcess, isLatestProcess } from './throttle'

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
    console.log('------------------- run test ------------------')

    // flag as running
    callbacks.onRun(payload)

    let result: { stdout: string | undefined; stderr: string | undefined }
    try {
      result = await node.exec(config.command)
    } catch (err) {
      result = err
    }
    const { stdout, stderr } = result

    // simple way to throttle requests
    if (!stdout) {
      return
    }

    if (stderr) {
      callbacks.onError(payload)

      // open terminal with error string
      const channel = getOutputChannel(outputChannelName)
      channel.show(false)
      channel.appendLine(stderr)
      return
    }

    // pass or fail?
    const tap = parser(stdout)
    if (tap.ok) {
      callbacks.onSuccess(payload)
      if (onSuccess) {
        onSuccess()
      }
    } else {
      // TODO: consider logging output to channel
      // open terminal with failed test string
      // const channel = getOutputChannel(outputChannelName)
      // channel.show(false)
      // channel.appendLine(tap.message)

      const message = tap.message ? tap.message : ''
      callbacks.onFail(payload, message)
    }
  }
}

export default createTestRunner
