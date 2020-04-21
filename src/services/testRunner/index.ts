import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { exec } from '../node'
import logger from '../logger'
import parser from './parser'
import { debounce, throttle } from './throttle'
import onError from '../sentry/onError'
import { clearOutput, displayOutput } from './output'
import { formatFailOutput } from './formatOutput'

interface Callbacks {
  onSuccess(position: T.Position): void
  onFail(position: T.Position, message: string): void
  onRun(position: T.Position): void
  onError(position: T.Position): void
}

const failChannelName = 'CodeRoad (Tests)'
const logChannelName = 'CodeRoad (Logs)'

const createTestRunner = (config: TT.TutorialTestRunnerConfig, callbacks: Callbacks) => {
  return async (position: T.Position, onSuccess?: () => void): Promise<void> => {
    logger('createTestRunner', position)
    const startTime = throttle()
    // throttle time early
    if (!startTime) {
      return
    }

    logger('------------------- RUN TEST -------------------')

    // flag as running
    callbacks.onRun(position)

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
        callbacks.onFail(position, firstFailMessage)
        const output = formatFailOutput(tap)
        displayOutput({ channel: failChannelName, text: output, show: true })
        return
      } else {
        callbacks.onError(position)
        // open terminal with error string
        displayOutput({ channel: failChannelName, text: stderr, show: true })
        return
      }
    }

    // PASS
    if (tap.ok) {
      clearOutput(failChannelName)
      callbacks.onSuccess(position)
      if (onSuccess) {
        onSuccess()
      }
    } else {
      // should never get here
      onError(new Error(`Error with running test ${JSON.stringify(position)}`))
      callbacks.onError(position)
    }
  }
}

export default createTestRunner
