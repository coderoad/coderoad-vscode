import node from '../../services/node'
import {getOutputChannel} from './channel'
import {setLatestProcess, isLatestProcess} from './throttle'

// TODO: use tap parser to make it easier to support other test runners
// TODO: how to load test runner parser
// TODO: where to instantiate test runner


interface Callbacks {
	onSuccess(): void
	onFail(): void
	onRun(): void
	onError(): void
}

interface TestRunnerConfig {
	command: string
	parser(output: string): Error | null
}

export const createTestRunner = (config: TestRunnerConfig, callbacks: Callbacks) => {

	const outputChannelName = 'TEST_OUTPUT'

	return async () => {
		console.log('------------------- run test ------------------')

		// track processId to prevent multiple 
		const processId = setLatestProcess()
		if (!isLatestProcess(processId)) {return }

		// flag as running
		callbacks.onRun()

		let result: {stdout: string | undefined, stderr: string | undefined}
		try {
			result = await node.exec(config.command)
		} catch (err) {
			result = err
		}
		const {stdout, stderr} = result

		// simple way to throttle requests
		if (!stdout || !isLatestProcess(processId)) {return }

		if (stderr) {
			callbacks.onError()

			// open terminal with error string
			const channel = getOutputChannel(outputChannelName)
			channel.show(false)
			channel.appendLine(stderr)
			return
		}

		// pass or fail?
		const testsFailed = config.parser(stdout)
		if (testsFailed === null) {
			callbacks.onSuccess()
		} else {
			// open terminal with failed test string
			const channel = getOutputChannel(outputChannelName)
			channel.show(false)
			channel.appendLine(testsFailed.message)
			callbacks.onFail()
		}
	}
}
