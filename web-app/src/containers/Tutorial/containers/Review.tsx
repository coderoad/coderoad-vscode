import * as React from 'react'
import * as TT from 'typings/tutorial'
import Content from '../components/Content'

interface Props {
  levels: TT.Level[]
}

const styles = {
  container: {
    padding: '1rem',
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
}

const ReviewPage = (props: Props) => {
  return (
    <div css={styles.container}>
      {props.levels.map((level: TT.Level) => (
        <div>
          <Content title={level.title} content={level.content} />
        </div>
      ))}
    </div>
  )
}

export default ReviewPage
