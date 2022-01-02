import MarkdownIt from 'markdown-it'
import Prism from 'prismjs'
import { css, jsx } from '@emotion/core'
// @ts-ignore no types for package
import markdownEmoji from 'markdown-it-emoji'
import * as React from 'react'
// load prism styles & language support
import './prism'
import logger from '../../services/logger'

// markdown highlighter instance
const md: MarkdownIt = new MarkdownIt({
  breaks: true,
  html: true,
  linkify: true,
  highlight(str, lang) {
    let hl

    try {
      hl = Prism.highlight(str, Prism.languages[lang], lang)
    } catch (error: any) {
      logger(`Error highlighting markdown: ${error.message}`)
      hl = md.utils.escapeHtml(str)
    }

    return `<pre class="language-${lang}"><code class="language-${lang}">${hl}</code></pre>`
  },
})
  // add emoji: https://github.com/markdown-it/markdown-it-emoji
  .use(markdownEmoji)

// const mdFeatures = [
//   'table',
//   'code',
//   'fence',
//   'blockquote',
//   'hr',
//   'list',
//   'reference',
//   'heading',
//   'lheading',
//   'html_block',
//   'paragraph',
//   'html_inline',
//   'autolink',
//   'link',
//   'image',
// ]

// TODO: markdownIt with rules disabling most features
// const minimalMarkdownIt = new MarkdownIt({
//   breaks: false,
//   html: true,
//   linkify: false,
// }).disable(mdFeatures)

interface Props {
  children: string
  minimal?: boolean
}

const Markdown = (props: Props) => {
  let html: string
  // TODO: set md to minimal rule set if specified
  try {
    html = md.render(props.children)
  } catch (error) {
    const message = `Failed to parse markdown for ${props.children}`
    // TODO: onError(new Error(message))
    logger(`Error: ${message}`)
    html = `<div style='background-color: #FFB81A; padding: 0.5rem;'>
			<strong style='padding-bottom: 0.5rem;'>ERROR: Failed to parse markdown</strong>
			<p>${props.children}</p>
		</div>`
  }
  // TODO sanitize markdown or HTML
  return <span className="coderoad-markdown" dangerouslySetInnerHTML={{ __html: html }} />
}

export default Markdown
