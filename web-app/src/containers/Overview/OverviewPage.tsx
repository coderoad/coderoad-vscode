import * as React from 'react'
import { Button } from '@alifd/next'
import * as G from 'typings/graphql'

import Markdown from '../../components/Markdown'

const styles = {
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
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    justifyContent: 'flex-end' as 'flex-end',
    position: 'absolute' as 'absolute',
    bottom: 0,
    height: '50px',
    padding: '1rem',
    paddingRight: '2rem',
    backgroundColor: 'black',
    width: '100%',
  },
  startButton: {
    backgroundColor: 'gold',
    fontWeight: 'bold' as 'bold',
  },
}

interface Props {
  title: string
  description: string
  levels: G.Level[]
  onNext(): void
}

const Summary = ({ title, description, levels, onNext }: Props) => (
  <div>
    <div style={styles.header}>
      <span>CodeRoad</span>
    </div>
    <div style={styles.summary}>
      <h2 style={styles.title}>{title}</h2>
      <Markdown>{description}</Markdown>
    </div>
    <div>
      <div style={styles.header}>
        <span>Levels</span>
      </div>
      <div style={styles.levelList}>
        {levels.map((level: G.Level, index: number) => (
          <div key={index}>
            <h4>
              {index + 1}. {level.title}
            </h4>
            <div>{level.description}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={styles.options}>
      {/* TODO: Add back button */}
      <Button style={styles.startButton} onClick={() => onNext()}>
        Start
      </Button>
    </div>
  </div>
)

export default Summary
