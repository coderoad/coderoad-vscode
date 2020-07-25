import { configure } from '@storybook/react'
import '../src/styles/reset.css'

// setup acquireVsCodeApi mock
// @ts-ignore
global.acquireVsCodeApi = () => ({
  postMessage(event: string) {
    console.log('ERROR: VSCode did not load properly in CodeRoad extension', event)
  },
})

// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /\.stories\.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
