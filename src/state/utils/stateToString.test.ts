//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import stateToString from './stateToString'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode'
// import * as myExtension from '../extension'

// Defines a Mocha test suite to group tests of similar kind together
describe('StateToString', () => {

	test('no levels deep', () => {
		expect(stateToString('first')).toBe('first')
	})
	// Defines a Mocha unit test
	test('one level deep', () => {
		expect(stateToString({first: 'second'})).toBe('first.second')
	})

	test('two levels deep', () => {
		expect(stateToString({first: {second: 'third'}})).toBe('first.second.third')
	})
})
