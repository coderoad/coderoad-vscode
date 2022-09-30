// import '../src/styles/reset.css'

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../stories/Temp.stories.tsx', '../stories/Error.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-knobs', '@storybook/addon-links'],
  babel: async (options) => ({
    ...options,
    presets: [...options.presets, '@emotion/babel-preset-css-prop', '@babel/preset-react'],
  }),
}
