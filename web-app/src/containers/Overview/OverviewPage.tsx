import * as React from 'react'
import * as G from 'typings/graphql'
import { css, jsx } from '@emotion/core'
import Button from '../../components/Button'
import Markdown from '../../components/Markdown'

const styles = {
  page: {
    position: 'relative' as 'relative',
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    width: '100%',
  },
  summary: {
    padding: '0rem 1rem 1rem 1rem',
  },
  title: {
    fontWeight: 'bold' as 'bold',
  },
  description: {
    fontSize: '1rem',
  },
  header: {
    height: '36px',
    backgroundColor: '#EBEBEB',
    fontSize: '16px',
    lineHeight: '16px',
    padding: '10px 1rem',
  },
  levelList: {
    padding: '0rem 1rem',
  },
  options: {
    position: 'absolute' as 'absolute',
    bottom: 0,
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    justifyContent: 'flex-end' as 'flex-end',
    height: '50px',
    padding: '1rem',
    paddingRight: '2rem',
    backgroundColor: 'black',
    width: '100%',
  },
}

interface Props {
  title: string
  description: string
  levels: G.Level[]
  onNext(): void
}

const Summary = ({ title, description, levels, onNext }: Props) => (
  <div css={styles.page}>
    <div>
      <div css={styles.header}>
        <span>CodeRoad</span>
      </div>
      <div css={styles.summary}>
        <h2 css={styles.title}>{title}</h2>
        <Markdown>{description}</Markdown>
      </div>
      <div>
        <div css={styles.header}>
          <span>Levels</span>
        </div>
        <div css={styles.levelList}>
          {levels.map((level: G.Level, index: number) => (
            <div key={index}>
              <h4>
                {index + 1}. {level.title}
              </h4>
              <div>{level.summary}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div css={styles.options}>
      {/* TODO Add back button */}
      <Button type="primary" onClick={() => onNext()}>
        Start
      </Button>
    </div>
  </div>
)

export default Summary
