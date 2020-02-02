/*
 * css url font paths do not match up from the web-app as it is moved inside of build
 * in order to load fonts and icons, these paths must be reconciled.
 */
const fs = require('fs') // eslint-disable-line

// find the generated main css file
const getMainCSSFile = () => {
  const regex = /^main.[a-z0-9]+.chunk.css$/
  const mainCss = fs.readdirSync('build/static/css').filter(filename => filename.match(regex))
  if (!mainCss.length) {
    throw new Error('No main.css file found in build/static/css')
  }
  return mainCss[0]
}

// remap the font paths from the borken /fonts/ => ../../fonts/
const remapFontPaths = () => {
  const mainCSSFile = getMainCSSFile()
  const file = fs.readFileSync(`build/static/css/${mainCSSFile}`, 'utf8')
  const fontUrlRegex = /url\(\/fonts\//g
  const remappedFile = file.replace(fontUrlRegex, 'url(../../fonts/')
  fs.writeFileSync(`build/static/css/${mainCSSFile}`, remappedFile)
}

remapFontPaths()
