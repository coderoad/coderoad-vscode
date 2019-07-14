import MarkdownIt from 'markdown-it'
// @ts-ignore no types for package
import markdownEmoji from 'markdown-it-emoji'
// @ts-ignore no types for package
import prism from 'markdown-it-prism'
import * as React from 'react'

import './prism.css'

// markdown highlighter instance
const md = new MarkdownIt({
  breaks: true,
  // highlight: syntaxHighlight,
  html: true,
  linkify: true,
})
  // add emoji: https://github.com/markdown-it/markdown-it-emoji
  .use(markdownEmoji)
  .use(prism, {
    defaultLanguage: 'js',
  })

interface Props {
  children: string
}

const Markdown = (props: Props) => {
  const html = md.render(props.children)
  // TODO: sanitize HTML
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default Markdown
