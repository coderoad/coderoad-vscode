import * as React from 'react'
import * as TT from 'typings/tutorial'
import { css, jsx } from '@emotion/core'
import Card from '../../components/Card'
import Tag from '../../components/Tag'

const styles = {
  card: {
    cursor: 'pointer',
    display: 'inline-flex' as 'inline-flex',
    flexDirection: 'row' as 'row',
    minWidth: 500,
  },
  left: {
    width: 80,
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
  },
  right: {
    flex: '1',
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
  title: {
    margin: 0,
  },
  author: {
    margin: '0 0 2px 0',
    color: 'grey',
  },
  tags: {
    display: 'flex' as 'flex',
    alignItems: 'center' as 'center',
    padding: '2px',
  },
  languages: {
    display: 'flex' as 'flex',
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    justifyContent: 'flex-end' as 'flex-end',
    width: '100%',
  },
  languageIcon: {
    width: 30,
    height: 30,
  },
}

interface Props {
  title: string
  description: string
  onSelect(): void
}

const TutorialItem = (props: Props) => (
  <Card onClick={props.onSelect}>
    <div style={styles.card}>
      <div css={styles.left}>
        <img src="https://via.placeholder.com/75/75" height="75px" width="75px" />
      </div>
      <div css={styles.right}>
        <h2 css={styles.title}>{props.title}</h2>
        {/* {props.createdBy && <h3 css={styles.author}>{props.createdBy.name}</h3>} */}
        <div css={styles.tags}>
          <Tag>javascript</Tag>
        </div>
      </div>
    </div>
  </Card>
)

export default TutorialItem
