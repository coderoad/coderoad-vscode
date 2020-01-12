const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// see typescript setup
// https://storybook.js.org/docs/configurations/typescript-config/
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  })
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      plugins: [
        [
          'babel-plugin-import',
          {
            libraryName: '@alifd/next',
            style: true,
          },
        ],
      ],
      presets: [['react-app', { flow: false, typescript: true }], ['@emotion/babel-preset-css-prop']],
    },
  })

  config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }))

  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.modules = ['node_modules', path.resolve(__dirname, '../src')]

  return config
}
