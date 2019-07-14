import * as React from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  children: string
}

const Markdown = (props: Props) => <ReactMarkdown source={props.children} />

export default Markdown
