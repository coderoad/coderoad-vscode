import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import Steps from '../components/Steps'
import Content from '../components/Content'

interface Props {
  levels: TT.Level[]
  progress: T.Progress
  testStatus: T.TestStatus
}

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
}

const ReviewPage = (props: Props) => {
  return (
    <div css={styles.container}>
      {props.levels.map((level: TT.Level, index: number) => {
        return (
          <>
            <div>
              <Content title={level.title} content={level.content} />
              <Steps
                steps={level.steps}
                testStatus={props.testStatus}
                displayHintsIndex={level.steps.map((s) => -1)}
                setHintsIndex={() => {}}
              />
            </div>
            {index < props.levels.length - 1 ? <hr /> : null}
          </>
        )
      })}
    </div>
  )
}

export default ReviewPage
