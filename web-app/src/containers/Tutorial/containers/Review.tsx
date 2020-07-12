import * as React from 'react'
import * as TT from 'typings/tutorial'
import Steps from '../components/Steps'
import Content from '../components/Content'

interface Props {
  levels: TT.Level[]
}

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
  header: {
    display: 'flex' as 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '2rem',
    backgroundColor: '#EBEBEB',
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 0.4rem',
  },
  title: {
    marginLeft: '0.5rem',
  },
}

const ReviewPage = (props: Props) => {
  return (
    <div css={styles.container}>
      <div css={styles.header}>Review</div>
      {props.levels.map((level: TT.Level, index: number) => (
        <div key={level.id}>
          <div>
            <Content title={level.title} content={level.content} />
            <Steps steps={level.steps} />
          </div>
          {/* divider */}
          {index < props.levels.length - 1 ? <hr /> : null}
        </div>
      ))}
    </div>
  )
}

export default ReviewPage
