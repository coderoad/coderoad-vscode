// import '../src/styles/reset.css'

// setup acquireVsCodeApi mock
// @ts-ignore
global.acquireVsCodeApi = () => ({
  postMessage(event) {
    console.log('ERROR: VSCode did not load properly in CodeRoad extension', event)
  },
})

module.exports = {
  stories: ['../**/*.stories.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
  ],
}
