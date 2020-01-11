const { addLessLoader, addBabelPreset } = require('customize-cra')

module.exports = function override(config) {
  addBabelPreset('@emotion/babel-preset-css-prop')(config)

  return config
}
