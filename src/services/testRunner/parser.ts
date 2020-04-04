interface ParserOutput {
  ok: boolean
  fails: Array<{ message: string; details?: string }>
}

const r = {
  fail: /^not ok \d+\s(\-\s)?(.+)+$/,
  pass: /^ok/,
  details: /^#\s{2}(.+)$/,
}

const detect = (type: 'fail' | 'pass' | 'details', text: string) => r[type].exec(text)

const parser = (text: string): ParserOutput => {
  const lines = text.split('\n')

  const result: ParserOutput = {
    ok: false,
    fails: [],
  }

  // temporary holder of error detail strings
  let currentDetails: string | null = null

  const addCurrentDetails = () => {
    if (currentDetails) {
      result.fails[result.fails.length - 1].details = currentDetails
      currentDetails = null
    }
  }

  for (const line of lines) {
    if (!line.length) {
      continue
    }
    // be optimistic! check for success
    if (!result.ok && !result.fails.length) {
      if (!!detect('pass', line)) {
        result.ok = true
        addCurrentDetails()
        continue
      }
    }

    // check for failure
    const isFail = detect('fail', line)
    if (!!isFail) {
      result.ok = false
      result.fails.push({ message: isFail[2] })
      addCurrentDetails()
      continue
    }

    // check for error details
    const isDetails = detect('details', line)
    if (!!isDetails) {
      const lineDetails: string = isDetails[2]
      if (!currentDetails) {
        currentDetails = lineDetails
      } else {
        // @ts-ignore ignore as it must be a string
        currentDetails += `\n${lineDetails}`
      }
    }
  }
  return result
}

export default parser
