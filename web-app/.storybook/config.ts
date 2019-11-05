import {configure, addParameters} from '@storybook/react'
import '../src/styles/index.css'

// setup acquireVsCodeApi mock
// @ts-ignore
global.acquireVsCodeApi = () => ({
	postMessage(event: string) {
		console.log('postMessage', event)
	}
})


// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /\.stories\.tsx$/)

function loadStories() {
	req.keys().forEach(req)
}

configure(loadStories, module)

