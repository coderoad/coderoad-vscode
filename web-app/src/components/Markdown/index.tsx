import syntaxHighlighter from 'highlight.js'
import MarkdownIt from 'markdown-it'
// @ts-ignore no types for package
import markdownEmoji from 'markdown-it-emoji'
import * as React from 'react'

// syntax highlighting https://github.com/markdown-it/markdown-it
const syntaxHighlight = (str: string, lang: string) => {
  if (lang && syntaxHighlighter.getLanguage(lang)) {
    try {
      return syntaxHighlighter.highlight(lang, str).value
    } catch (__) {
      // ignore
    }
  }
  return '' // use external default escaping
}

// markdown highlighter instance
const md = new MarkdownIt({
  breaks: true,
  highlight: syntaxHighlight,
  html: true,
  linkify: true,
})
  // add emoji: https://github.com/markdown-it/markdown-it-emoji
  .use(markdownEmoji)

interface Props {
  children: string
}

const Markdown = (props: Props) => {
  const html = md.render(props.children)
  // TODO: sanitize HTML
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default Markdown
