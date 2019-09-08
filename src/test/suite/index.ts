import * as path from 'path'
// import * as glob from 'glob'
import * as jest from 'jest'

export async function run(): Promise<void> {

	const testDir = __dirname

	const config = {
		bail: false,
		rootDir: testDir,
		browser: false,
		json: false,
		useStderr: true,
	}
	// @ts-ignore
	const {results} = await jest.runCLI(config, [testDir])
		.catch((failure: any) => {
			console.error(failure)
		})

	if (results.numFailedTests > 0) {
		const failedTests = results.testResults.filter((t: any) => t.numFailingTests || t.numPendingTests)

		failedTests.forEach(console.log)
		throw new Error(' Test(s) failed')
	}

	console.log('--- JEST OUTPUT ---\n\n', JSON.stringify(results, null, 2))
	console.log(`${results.numPassedTests} test(s) passed!`)
}