import * as React from 'react'
import Markdown from '../../../components/Markdown'

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
  header: {
    display: 'flex' as 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '2rem',
    backgroundColor: '#EBEBEB',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 0.4rem',
  },
  content: {
    padding: '0.5rem',
  },
}

interface Props {}

const AboutPage = (props: Props) => {
  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <div>About CodeRoad</div>
      </div>
      <div css={styles.content}>
        <Markdown>
          {`
CodeRoad is an open source VSCode extension that allows you to **create** and **play** interactive coding tutorials inside VSCode.

Learn more or contribute at [https://github.com/coderoad/coderoad-vscode](https://github.com/coderoad/coderoad-vscode).

##### Why CodeRoad?

Interactive learning is the most effective way to gain new skills and knowledge. CodeRoad aims to help tutorial creators develop and share interactive content with the community.

For learners, there are a number of advantages to running tutorials inside VSCode:

a. Learn in a real world coding environment
b. Get rapid feedback on save and helpful error messages
c.Users own the code, and can build a Git timeline and deploy a portfolio

##### Subscribe

Join our [mailing list](https://tiny.cc/coderoad) to hear about new tutorials & features. 

##### Contact

We'd love to hear your feedback. 

For bugs/feature requests, reach out on GitHub.

Otherwise, email us at [coderoadapp@gmail.com](mailto:coderoadapp@gmail.com).

`}
        </Markdown>
      </div>
    </div>
  )
}

export default AboutPage
