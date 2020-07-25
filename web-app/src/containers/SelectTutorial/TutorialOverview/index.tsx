import * as React from 'react'
import * as TT from 'typings/tutorial'
import { Breadcrumb } from '@alifd/next'
import Button from '../../../components/Button'
import Markdown from '../../../components/Markdown'
import { Theme } from '../../../styles/theme'

const styles = {
  page: {
    position: 'relative' as 'relative',
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    width: '100%',
  },
  nav: (theme: Theme) => ({
    height: theme['$nav-height'],
  }),
  navLink: (theme: Theme) => ({
    fontSize: theme['$font-size-caption'],
    lineHeight: theme['$font-lineheight-1'],
    color: 'white',
    cursor: 'pointer',
  }),
  content: {
    paddingBottom: '5rem',
  },
  header: (theme: Theme) => ({
    color: theme['$color-white'],
    backgroundColor: theme['$color-brand1-9'],
    padding: '1rem 1rem 1.5rem 1rem',
  }),
  title: {},
  description: {
    fontSize: '1rem',
  },
  meta: {
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap',
  },
  levelList: {
    padding: '0rem 1rem',
  },
  levelSummary: {
    paddingLeft: '1.1rem',
  },
  footer: (theme: Theme) => ({
    position: 'fixed' as 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    justifyContent: 'flex-end' as 'flex-end',
    height: theme['$footer-height'],
    padding: '1rem',
    paddingRight: '2rem',
    backgroundColor: theme['$color-black'],
    width: '100%',
  }),
}

interface Props {
  tutorial: TT.Tutorial
  onNext(): void
  onClear(): void
}

const Summary = (props: Props) => (
  <div css={styles.page}>
    <div css={styles.content}>
      <div css={styles.header}>
        <div css={styles.nav}>
          <Breadcrumb separator="/">
            <Breadcrumb.Item>
              <div css={styles.navLink} onClick={props.onClear}>
                &lt; Back to Tutorials
              </div>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Markdown>{`# ${props.tutorial.summary.title}`}</Markdown>
        <Markdown>{`### ${props.tutorial.summary.description}`}</Markdown>
        {/* <h5 css={styles.meta}>
          <div css={{ marginRight: '2rem' }}>Created by {props.createdBy.name}</div>
          <div>Last updated {moment(props.updatedAt).format('M/YYYY')}</div>
        </h5> */}
      </div>
      <div>
        <div css={styles.levelList}>
          <h2>Content</h2>
          {props.tutorial.levels.map((level: TT.Level, index: number) => (
            <div key={index}>
              <Markdown>{`### ${index + 1}. ${level.title}`}</Markdown>
              <div css={styles.levelSummary}>
                <Markdown>{level.summary}</Markdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <footer css={styles.footer}>
      {/* TODO Add back button */}
      <Button type="primary" onClick={props.onNext}>
        Start
      </Button>
    </footer>
  </div>
)

export default Summary
