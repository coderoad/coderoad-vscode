import { TutorialTestRunnerConfig } from 'typings/tutorial'
import { exec } from '../node'
import logger from '../logger'
import parser from './parser'
import { debounce, throttle } from './throttle'
import onError from '../sentry/onError'
import { clearOutput, displayOutput } from './output'
import { formatFailOutput } from './formatOutput'

export interface Payload {
  stepId: string
}

interface Callbacks {
  onSuccess(payload: Payload): void
  onFail(payload: Payload, message: string): void
  onRun(payload: Payload): void
  onError(payload: Payload): void
}

const failChannelName = 'CodeRoad (Tests)'
const logChannelName = 'CodeRoad (Logs)'

const createTestRunner = (config: TutorialTestRunnerConfig, callbacks: Callbacks) => {
  return async (payload: Payload, onSuccess?: () => void): Promise<void> => {
    const startTime = throttle()
    // throttle time early
    if (!startTime) {
      return
    }

    logger('------------------- RUN TEST -------------------')

    // flag as running
    callbacks.onRun(payload)

    let result: { stdout: string | undefined; stderr: string | undefined }
    try {
      result = await exec({ command: config.command, path: config.path })
    } catch (err) {
      result = { stdout: err.stdout, stderr: err.stack }
    }

    // ignore output if not latest process
    // this is a crappy version of debounce
    if (!debounce(startTime)) {
      return
    }

    logger('----------------- PROCESS TEST -----------------')

    const { stdout, stderr } = result

    const tap = parser(stdout || '')

    displayOutput({ channel: logChannelName, text: tap.logs.join('\n'), show: false })

    if (stderr) {
      // FAIL also trigger stderr
      if (stdout && stdout.length && !tap.ok) {
        const firstFailMessage = tap.failed[0].message
        callbacks.onFail(payload, firstFailMessage)
        const output = formatFailOutput(tap)
        displayOutput({ channel: failChannelName, text: output, show: true })
        return
      } else {
        callbacks.onError(payload)
        // open terminal with error string
        displayOutput({ channel: failChannelName, text: stderr, show: true })
        return
      }
    }

    // PASS
    if (tap.ok) {
      clearOutput(failChannelName)
      callbacks.onSuccess(payload)
      if (onSuccess) {
        onSuccess()
      }
    } else {
      // should never get here
      onError(new Error(`Error with running test ${JSON.stringify(payload)}`))
      callbacks.onError(payload)
    }
  }
}

export default createTestRunner
