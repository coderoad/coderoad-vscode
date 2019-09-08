import * as path from 'path'
// import * as glob from 'glob'
import * as jest from 'jest'

export async function run(): Promise<void> {

	const testDir = __dirname

	const config = {
		bail: false,
		// rootDir: testDir,
		browser: false,
		json: false,
		useStderr: true,
	}
	// @ts-ignore
	const result = await jest.runCLI(config, [testDir])
		.catch((failure: any) => {
			console.error(failure)
		})

	console.log('--- JEST OUTPUT ---\n\n', JSON.stringify(result.results, null, 2))
}