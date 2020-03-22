// @ts-ignore
if (!global.acquireVsCodeApi) {
  // @ts-ignore
  global.acquireVsCodeApi = () => ({
    postMessage(event: string) {
      console.log('postMessage', event)
    },
  })
}
