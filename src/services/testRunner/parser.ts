interface ParserOutput {
  ok: boolean
  message?: string
}

const fail = /^not ok \d+ .{1} (.+)+$/
const ok = /^ok \d+ .{1} /

const parser = (text: string): ParserOutput => {
  const lines = text.split('\n')
  let hasPass = false
  for (const line of lines) {
    if (line.length) {
      // parse failed test
      const failRegex = fail.exec(line)
      if (!!failRegex) {
        return { ok: false, message: failRegex[1] }
      }
      if (!hasPass) {
        if (!!ok.exec(line)) {
          hasPass = true
        }
      }
    }
  }
  return { ok: hasPass }
}

export default parser
