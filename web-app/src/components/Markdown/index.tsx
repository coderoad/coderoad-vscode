import MarkdownIt from 'markdown-it'
// @ts-ignore no types for package
import markdownEmoji from 'markdown-it-emoji'
// @ts-ignore no types for package
import prism from 'markdown-it-prism'
import * as React from 'react'

import './prism.css'

// markdown highlighter instance
const md: MarkdownIt = new MarkdownIt({
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
  let html: string
  try {
    html = md.render(props.children)
  } catch (error) {
    console.log(`failed to parse markdown for ${props.children}`)
    html = `<div style='background-color: #FFB81A; padding: 0.5rem;'>
			<strong style='padding-bottom: 0.5rem;'>ERROR: Failed to parse markdown</strong>
			<p>${props.children}</p>
		</div>`
  }
  // TODO: sanitize markdown or HTML
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default Markdown
