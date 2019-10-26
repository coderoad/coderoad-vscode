import '@alifd/next/dist/next.css'
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

// set viewport width
// see https://www.npmjs.com/package/@storybook/addon-viewport
addParameters({
	viewport: {
		viewports: {
			name: 'SideMenu',
			styles: {
				width: 200,
				height: window.innerHeight,
			},
			type: 'mobile'
		},
		defaultViewport: 'SideMenu',
	},
})

configure(loadStories, module)

