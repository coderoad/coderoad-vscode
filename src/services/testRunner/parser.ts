interface ParserOutput {
  ok: boolean
  passed: Array<{ message: string }>
  failed: Array<{ message: string; details?: string }>
}

const r = {
  fail: /^not ok \d+\s(\-\s)?(.+)+$/,
  pass: /^ok \d+\s(\-\s)?(.+)+$/,
  details: /^#\s{2}(.+)$/,
}

const detect = (type: 'fail' | 'pass' | 'details', text: string) => r[type].exec(text)

const parser = (text: string): ParserOutput => {
  const lines = text.split('\n')

  const result: ParserOutput = {
    ok: true,
    passed: [],
    failed: [],
  }

  // temporary holder of error detail strings
  let currentDetails: string | null = null

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
    // be optimistic! check for success
    const isPass = detect('pass', line)
    if (!!isPass) {
      result.passed.push({ message: isPass[2].trim() })
      addCurrentDetails()
      continue
    }

    // check for failure
    const isFail = detect('fail', line)
    if (!!isFail) {
      result.ok = false
      addCurrentDetails()
      result.failed.push({ message: isFail[2].trim() })
      continue
    }

    // check for error details
    const isDetails = detect('details', line)
    if (!!isDetails) {
      const lineDetails: string = isDetails[1].trim()
      if (!currentDetails) {
        currentDetails = lineDetails
      } else {
        // @ts-ignore ignore as it must be a string
        currentDetails += `\n${lineDetails}`
      }
    }
  }
  addCurrentDetails()
  return result
}

export default parser
