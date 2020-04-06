import { ParserOutput, Fail } from './parser'

// TODO: implement better success ouput
// export const formatSuccessOutput = (tap: ParserOutput): string => {}

export const formatFailOutput = (tap: ParserOutput): string => {
  let output = `TESTS\n`
  tap.failed.forEach((fail: Fail) => {
    const details = fail.details ? `\n${fail.details}\n\n` : ''
    output += `  ✘ ${fail.message}\n${details}`
  })
  return output
}
