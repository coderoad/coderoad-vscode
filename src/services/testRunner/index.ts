import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { exec } from '../node'
import logger from '../logger'
import parser, { ParserOutput } from './parser'
import { debounce, throttle } from './throttle'
import onError from '../sentry/onError'
import { clearOutput, addOutput } from './output'
import { formatFailOutput } from './formatOutput'

interface Callbacks {
  onSuccess(position: T.Position): void
  onFail(position: T.Position, failSummary: T.TestFail): void
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

    const tap: ParserOutput = parser(stdout || '')

    addOutput({ channel: logChannelName, text: tap.logs.join('\n'), show: false })

    if (stderr) {
      // FAIL also trigger stderr
      if (stdout && stdout.length && !tap.ok) {
        const firstFail = tap.failed[0]
        const failSummary = {
          title: firstFail.message || 'Test Failed',
          description: firstFail.details || 'Unknown error',
          summary: tap.summary,
        }
        callbacks.onFail(position, failSummary)
        const output = formatFailOutput(tap)
        addOutput({ channel: failChannelName, text: output, show: true })
        return
      } else {
        callbacks.onError(position)
        // open terminal with error string
        addOutput({ channel: failChannelName, text: stderr, show: true })
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
