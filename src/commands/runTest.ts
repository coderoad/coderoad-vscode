import { getOutputChannel } from '../utils/channel'
import { exec } from '../utils/node'
import * as storage from '../services/storage'
import * as testResult from '../services/testResult'

// ensure only latest run_test action is taken
let currentId = 0

// quick solution to prevent processing multiple results
// NOTE: may be possible to kill child process early
const shouldExitEarly = (processId: number): boolean => {
  return currentId !== processId
}

export default async function runTest(): Promise<void> {
  // increment process id
  let processId = ++currentId

  const outputChannelName = 'Test Output'

  // TODO: validate test directory from package.json exists
  // let testFile = path.join('test');
  // if (!await exists(testFile)) {
  // 	return emptyTasks;
  // }

  // TODO: verify test runner for args
  const testArgs = ['--json']

  // if .git repo, use --onlyChanged
  // const hasGit = path.join('.git');
  // if (await exists(hasGit)) {
  // 	testArgs.push('--onlyChanged')
  // }

  let commandLine = `npm test -- ${testArgs.join(' ')}`

  try {
    // capture position early on test start
    // in case position changes
    const [position, { stdout }] = await Promise.all([storage.getPosition(), exec(commandLine)])
    if (shouldExitEarly(processId)) {
      // exit early
      return
    }

    if (stdout) {
      let lines = stdout.split(/\r{0,1}\n/)
      console.log('SUCCESS LINES', lines)
      for (let line of lines) {
        if (line.length === 0) {
          continue
        }

        const regExp = /^{\"numFailedTestSuites/
        const matches = regExp.exec(line)
        if (matches && matches.length) {
          console.log('MATCHES SUCCESS')
          const result = JSON.parse(line)

          if (result.success) {
            console.log('SUCCESS')
            if (shouldExitEarly(processId)) {
              // exit early
              return
            }
            // @ts-ignore
            testResult.onSuccess(position)
          } else {
            console.log('NOT SUCCESS?')
          }
        }
      }
    }
  } catch (err) {
    if (shouldExitEarly(processId)) {
      // exit early
      return
    }
    // error contains output & error message
    // output can be parsed as json
    const { stdout, stderr } = err
    console.log('TEST FAILED', stdout)

    if (!stdout) {
      console.error('SOMETHING WENT WRONG WITH A PASSING TEST')
    }
    // test runner failed
    const channel = getOutputChannel(outputChannelName)

    if (stdout) {
      let lines = stdout.split(/\r{0,1}\n/)

      for (let line of lines) {
        if (line.length === 0) {
          continue
        }

        const dataRegExp = /^{\"numFailedTestSuites"/
        const matches = dataRegExp.exec(line)

        if (matches && matches.length) {
          const result = JSON.parse(line)
          const firstError = result.testResults.find((t: any) => t.status === 'failed')

          if (firstError) {
            if (shouldExitEarly(processId)) {
              // exit early
              return
            }
            console.log('ERROR', firstError.message)
            testResult.onFailure()
          } else {
            console.error('NOTE: PARSER DID NOT WORK FOR ', line)
          }
        }
      }
    }

    if (stderr) {
      channel.show(false)
      channel.appendLine(stderr)
    }
    // if (err.stdout) {
    // 	channel.appendLine(err.stdout);
    // }
  }
}
