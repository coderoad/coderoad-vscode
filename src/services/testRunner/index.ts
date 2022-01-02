import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { exec } from '../node'
import logger from '../logger'
import parser, { ParserOutput } from './parser'
import parseSubtasks from './subtasks'
import { debounce, throttle } from './throttle'
import { onError } from '../telemetry'
import { clearOutput, addOutput } from '../logger/output'
import { formatFailOutput } from './formatOutput'

interface Callbacks {
  onSuccess(position: T.Position): void
  onFail(position: T.Position, failSummary: T.TestFail): void
  onRun(position: T.Position): void
  onError(position: T.Position): void
  onLoadSubtasks({ summary }: { summary: { [testId: number]: boolean } }): void
}

const failChannelName = 'CodeRoad (Tests)'

interface TestRunnerParams {
  position: T.Position
  subtasks?: boolean
  onSuccess?: () => void
}

const createTestRunner = (data: TT.Tutorial, callbacks: Callbacks): ((params: any) => Promise<void>) => {
  const testRunnerConfig = data.config.testRunner
  const testRunnerFilterArg = testRunnerConfig.args?.filter
  return async ({ position, onSuccess }: TestRunnerParams): Promise<any> => {
    const startTime = throttle()
    // throttle time early
    if (!startTime) {
      return
    }

    logger('------------------- RUN TEST -------------------')

    // calculate level & step from position
    const level: TT.Level | null = data.levels.find((l) => l.id === position.levelId) || null
    if (!level) {
      console.warn(`Level "${position.levelId}" not found`)
      return
    }
    const step: TT.Step | null = level.steps.find((s) => s.id === position.stepId) || null
    if (!step) {
      console.warn(`Step "${position.stepId}" not found`)
      return
    }

    callbacks.onRun(position)

    let result: { stdout: string | undefined; stderr: string | undefined }
    try {
      let command = testRunnerConfig.args
        ? `${testRunnerConfig.command} ${testRunnerConfig?.args.tap}`
        : testRunnerConfig.command // TODO: enforce TAP

      // filter tests if requested
      if (testRunnerFilterArg) {
        // get tutorial step from position
        // check the step actions for specific command
        // NOTE: cannot just pass in step actions as the test can be called by:
        // - onEditorSave, onWatcher, onSolution, runTest, onSubTask
        const levels = data.levels
        const level = levels.find((l) => l.id === position.levelId)
        const step = level?.steps.find((s) => s.id === position.stepId)
        const testFilter = step?.setup?.filter
        if (testFilter) {
          // append filter commands
          command = [command, testRunnerFilterArg, testFilter].join(' ')
        }
      }
      logger(`COMMAND: ${command}`)
      result = await exec({ command, dir: testRunnerConfig.directory })
    } catch (err: any) {
      result = { stdout: err.stdout, stderr: err.stack }
    }

    // ignore output if not latest process
    // this is a crappy version of debounce
    if (!debounce(startTime)) {
      return
    }

    logger('---------------- TEST RESULTS -----------------')

    const { stdout, stderr } = result

    const tap: ParserOutput = parser(stdout || '')

    if (tap.logs.length) {
      logger(tap.logs.join('\n'))
    }

    if (stderr) {
      if (!tap.failed.length) {
        // test runner failed
        const failSummary = {
          title: 'Test Runner Failed',
          description: stderr,
          summary: {},
        }
        callbacks.onFail(position, failSummary)
        return
      } else if (stdout && stdout.length && !tap.ok) {
        // FAIL also trigger stderr
        const firstFail = tap.failed[0]
        const failSummary = {
          title: firstFail.message || 'Test Failed',
          description: firstFail.details || 'Unknown error',
          summary: tap.summary,
        }

        if (step.subtasks) {
          const subtaskSummary = parseSubtasks(tap.summary, position.stepId || '')

          callbacks.onFail(position, {
            ...failSummary,
            summary: subtaskSummary,
          })
        } else {
          callbacks.onFail(position, failSummary)
        }

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
