// setup acquireVsCodeApi mock
// @ts-ignore
global.acquireVsCodeApi = () => ({
  postMessage(event) {
    console.log('ERROR: VSCode did not load properly in CodeRoad extension', event)
  },
})
