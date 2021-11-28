/* eslint-disable @typescript-eslint/no-var-requires */
const { addBabelPreset, addWebpackModuleRule, addBabelPlugin } = require('customize-cra')

module.exports = function override(config) {
  addWebpackModuleRule({
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
  })(config)

  // load @alifd/next component css
  addBabelPlugin([
    'import',
    {
      libraryName: '@alifd/next',
      style: true,
    },
  ])(config)

  // setup emotion styles
  addBabelPreset('@emotion/babel-preset-css-prop')(config)

  return config
}
