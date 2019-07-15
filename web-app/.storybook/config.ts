import '@alifd/next/dist/next.css'
import { configure } from '@storybook/react'
import '../src/styles/index.css'

// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /\.stories\.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
