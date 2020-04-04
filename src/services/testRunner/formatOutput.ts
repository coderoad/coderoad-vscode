// @ts-ignore no declaration files
import * as clc from 'cli-color'
import { ParserOutput } from './parser'

// TODO: implement better success ouput
// export const formatSuccessOutput = (tap: ParserOutput): string => {}

export const formatFailOutput = (tap: ParserOutput): string => {
  let output = `'TESTS FAILED\n`
  tap.failed.forEach((fail) => {
    const details = fail.details ? `\n${fail.details}\n\n` : ''
    output += `  ✘ ${fail.message}\n${details}`
  })
  return output
}
