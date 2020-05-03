import { ParserOutput, Fail } from './parser'

// TODO: implement better success ouput
// export const formatSuccessOutput = (tap: ParserOutput): string => {}

export const formatFailOutput = (tap: ParserOutput): string => {
  let output = `FAILED TEST LOG\n`
  tap.failed.forEach((fail: Fail) => {
    const details = fail.details ? `\n${fail.details}\n` : ''
    const logs = fail.logs ? `\n${fail.logs.join('\n')}\n` : ''
    const result = `${logs}  ✘ ${fail.message}\n${details}`
    output += result
  })
  return output
}
