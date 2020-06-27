import logger from '../logger'

export interface Fail {
  message: string
  details?: string
  logs?: string[]
}

export interface Pass {
  message: string
  logs?: string[]
}

export interface ParserOutput {
  ok: boolean
  passed: Pass[]
  failed: Fail[]
  logs: string[]
  summary: { [key: string]: boolean }
}

const r = {
  start: /^(not ok)|(ok)/,
  fail: /^not ok (?<index>\d+)\s(\-\s)?(?<message>.+)$/,
  pass: /^ok (?<index>\d+)\s(\-\s)?(?<message>.+)$/,
  details: /^#\s{2}(?<message>.+)$/,
  ignore: /^(1\.\.[0-9]+)|(#\s+(tests|pass|fail|skip)\s+[0-9]+)$/,
}

const detect = (type: 'fail' | 'pass' | 'details', text: string) => {
  const match = r[type].exec(text)
  if (!match) {
    return null
  }
  return match.groups
}

// see comment below for extracting logic into custom consumer later
const formatMessage = (message: string): string => {
  // specific for python tap.py output
  const isTappy = message.match(/^test_(?<underscoredMessage>.+)\s(?<testPath>.+)$/)
  if (isTappy?.groups?.underscoredMessage) {
    return isTappy.groups.underscoredMessage.split('_').join(' ').trim()
  }
  return message.trim()
}

// TODO: consider creating custom TAP consumers for languages
// otherwise code here will eventually get out of hand
// currently supports: mocha, python tap.py
const parser = (text: string): ParserOutput => {
  const lineList = text.split('\n')
  // start after 1..n output
  const startingPoint = lineList.findIndex((t) => t.match(r.start))
  const lines = lineList.slice(startingPoint)

  const result: ParserOutput = {
    ok: true,
    passed: [],
    failed: [],
    logs: [],
    summary: {},
  }

  // temporary holder of error detail strings
  let currentDetails: string | null = null
  let logs: string[] = []

  const addCurrentDetails = () => {
    const failLength: number = result.failed.length
    if (currentDetails && !!failLength) {
      result.failed[failLength - 1].details = currentDetails
      currentDetails = null
    }
  }

  for (const line of lines) {
    if (!line.length) {
      continue
    }
    // be optimistic! check for success first
    const isPass = detect('pass', line)
    if (!!isPass) {
      const message = formatMessage(isPass.message)
      const pass: Pass = { message }
      if (logs.length) {
        pass.logs = logs
        logs = []
      }
      result.passed.push(pass)
      result.summary[message] = true
      addCurrentDetails()
      continue
    }

    // check for failure
    const isFail = detect('fail', line)
    if (!!isFail) {
      result.ok = false
      addCurrentDetails()
      const message = formatMessage(isFail.message)
      const fail: Fail = { message }
      if (logs.length) {
        fail.logs = logs
        logs = []
      }
      result.failed.push(fail)
      result.summary[message] = false
      continue
    }

    // check for error details
    const isDetails = detect('details', line)
    if (!!isDetails) {
      const lineDetails: string = isDetails.message.trim()
      if (!currentDetails) {
        currentDetails = lineDetails
      } else {
        currentDetails += `\n${lineDetails}`
      }
      continue
    }

    if (!r.ignore.exec(line)) {
      // must be a log, associate with the next test
      logs.push(line)
      result.logs.push(line)
    }
  }
  addCurrentDetails()
  return result
}

export default parser
