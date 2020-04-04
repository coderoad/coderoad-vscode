import parser from './parser'

describe('parser', () => {
  test('should pass single success', () => {
    const example = `
1..1
ok 1 - Should pass
`
    expect(parser(example)).toEqual({ ok: true, fails: [] })
  })
  test('should detect multiple successes', () => {
    const example = `
1..2
ok 1 - Should pass
ok 2 - Should also pass
`
    expect(parser(example)).toEqual({ ok: true, fails: [] })
  })
  test('should detect failure if no tests passed', () => {
    const example = `
# Starting...
# 1 test suites found.

#  FAIL  __tests__/sum.test.js

not ok 1 ● sum › should add two numbers together
`
    expect(parser(example).ok).toBe(false)
  })
  test('should detect single failure among successes', () => {
    const example = `
1..3
ok 1 - Should pass
not ok 2 - This one fails
ok 3 - Also passes
`
    expect(parser(example).ok).toBe(false)
  })
  test('should return failure message', () => {
    const example = `
1..4
ok 1 - Should pass
not ok 2 - First to fail
ok 3 - Also passes
not ok 4 - Second to fail
`
    expect(parser(example).fails).toEqual([{ message: 'First to fail' }, { message: 'Second to fail' }])
  })

  test('should parse mocha tap example', () => {
    const example = `
1..3
ok 1 itemList data should not be changed
ok 2 sumItems shouldn't return NaN
ok 3 sumItems should total numbers accurately
# tests 3
# pass 3
# fail 0
# skip 0
`
    expect(parser(example).ok).toBe(true)
  })

  test('should return failure message for mocha tap example', () => {
    const example = `
1..3
ok 1 itemList data should not be changed
not ok 2 sumItems shouldn't return NaN
ok 3 sumItems should total numbers accurately
# tests 3
# pass 2
# fail 1
# skip 0
`
    expect(parser(example).fails).toEqual([{ message: "sumItems shouldn't return NaN" }])
  })
})
