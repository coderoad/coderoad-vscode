declare module 'tap-parser' {
  type TapParserOutput = {
    ok: boolean
    count: number
    pass: number
    plan: {
      start: number
      end: number
    }
  }
  const Parser: any
  export default Parser
}
