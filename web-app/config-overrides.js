const path = require('path') // eslint-disable-line

module.exports = function override(config) {
  config.module.rules.push({
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  })

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      plugins: [
        // load css for @alifd/next components
        [
          'babel-plugin-import',
          {
            libraryName: '@alifd/next',
            style: true,
          },
        ],
      ],
      presets: [
        // react-app
        ['react-app', { flow: false, typescript: true }],
        // allow emotion css prop on html
        ['@emotion/babel-preset-css-prop'],
      ],
    },
  })

  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.modules = ['node_modules', path.resolve(__dirname, './src')]

  return config
}
