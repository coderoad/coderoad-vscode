// import '../src/styles/reset.css'

// setup acquireVsCodeApi mock
// @ts-ignore
global.acquireVsCodeApi = () => ({
  postMessage(event) {
    console.log('ERROR: VSCode did not load properly in CodeRoad extension', event)
  },
})

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../stories/Temp.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-knobs', '@storybook/addon-links'],
  babel: async (options) => ({
    ...options,
    presets: [...options.presets, '@emotion/babel-preset-css-prop', '@babel/preset-react'],
  }),
}
