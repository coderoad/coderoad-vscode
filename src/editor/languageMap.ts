import * as G from 'typings/graphql'
// sourced from https://code.visualstudio.com/docs/languages/identifiers
const languageMap: {
  [lang: string]: G.FileFormat
} = {
  go: 'GO',
  javascript: 'JS',
  javascriptreact: 'JSX',
  json: 'JSON',
  less: 'LESS',
  lua: 'LUA',
  php: 'PHP',
  python: 'PY',
  ruby: 'RB',
  sass: 'SASS',
  scss: 'SCSS',
  sql: 'SQL',
  typescript: 'TS',
  typescriptreact: 'TSX',
  yaml: 'YAML',
}

export default languageMap
