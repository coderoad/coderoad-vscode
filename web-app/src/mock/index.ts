// @ts-ignore
if (!global.acquireVsCodeApi) {
  // @ts-ignore
  global.acquireVsCodeApi = () => ({
    postMessage(event: string) {
      console.log('VSCode did not load properly for CodeRoad extension', event)
    },
  })
}
