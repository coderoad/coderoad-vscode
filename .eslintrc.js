module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['prettier'],
  extends: ['react-app', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // 'react/forbid-component-props': [1, { forbid: ['style'] }],
    // 'react/forbid-dom-props': [1, { forbid: ['style'] }],
    'space-before-function-paren': 0,
    'prettier/prettier': 'error',
  },
}
