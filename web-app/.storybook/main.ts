const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// import '../src/styles/reset.css'

module.exports = {
  core: {
    builder: 'webpack4',
  },
  stories: ['../stories/Temp.stories.tsx', '../stories/Error.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-knobs', '@storybook/addon-links'],
  babel: async (options) => ({
    ...options,
    presets: [...options.presets, '@emotion/babel-preset-css-prop', '@babel/preset-react'],
    plugins: [
      [
        'import',
        {
          libraryName: '@alifd/next',
          style: true,
        },
      ],
    ],
  }),
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    })
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
    })

    config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }))
    config.resolve.extensions.push('.ts', '.tsx')

    config.resolve.modules = ['node_modules', path.resolve(__dirname, '../src')]

    return config
  },
}
