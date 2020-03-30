import * as React from 'react'
import * as TT from 'typings/tutorial'
import moment from 'moment'
import Button from '../../components/Button'
import Markdown from '../../components/Markdown'
import { Breadcrumb } from '@alifd/next'

const footerHeight = '3rem'

const styles = {
  page: {
    position: 'relative' as 'relative',
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    width: '100%',
  },
  nav: {
    display: 'flex',
    height: '2rem',
    fontSize: '1rem',
    lineHeight: '1rem',
    alignItems: 'center',
  },
  navLink: {
    fontSize: '14px',
    color: 'white',
    cursor: 'pointer',
  },
  content: {
    paddingBottom: '5rem',
  },
  header: {
    color: 'white',
    backgroundColor: '#0066B8',
    padding: '1rem 1rem 1.5rem 1rem',
  },
  title: {
    fontWeight: 'bold' as 'bold',
  },
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
  footer: {
    position: 'fixed' as 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    justifyContent: 'flex-end' as 'flex-end',
    height: footerHeight,
    padding: '1rem',
    paddingRight: '2rem',
    backgroundColor: 'black',
    width: '100%',
  },
}

interface Props {
  title: string
  description: string
  levels: TT.Level[]
  onNext(): void
  onBack(): void
}

const Summary = (props: Props) => (
  <div css={styles.page}>
    <div css={styles.content}>
      <div css={styles.header}>
        <div css={styles.nav}>
          <Breadcrumb separator="/">
            <Breadcrumb.Item>
              <div css={styles.navLink} onClick={props.onBack}>
                &lt; Back to Tutorials
              </div>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <h1 css={styles.title}>{props.title}</h1>
        <h3>{props.description}</h3>
        {/* <h5 css={styles.meta}>
          <div css={{ marginRight: '2rem' }}>Created by {props.createdBy.name}</div>
          <div>Last updated {moment(props.updatedAt).format('M/YYYY')}</div>
        </h5> */}
      </div>
      <div>
        <div css={styles.levelList}>
          <h2>Content</h2>
          {props.levels.map((level: TT.Level, index: number) => (
            <div key={index}>
              <h3>
                {index + 1}. {level.title}
              </h3>
              <div css={styles.levelSummary}>
                <Markdown>{level.summary}</Markdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div css={styles.footer}>
      {/* TODO Add back button */}
      <Button type="primary" onClick={props.onNext}>
        Start
      </Button>
    </div>
  </div>
)

export default Summary
