import * as React from 'react'
import * as T from 'typings'
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
}

const ReviewPage = (props: Props) => {
  return (
    <div css={styles.container}>
      {props.levels.map((level: TT.Level, index: number) => {
        return (
          <>
            <div>
              <Content title={level.title} content={level.content} />
              <Steps steps={level.steps} displayHintsIndex={level.steps.map((s) => -1)} setHintsIndex={() => {}} />
            </div>
            {/* divider */}
            {index < props.levels.length - 1 ? <hr /> : null}
          </>
        )
      })}
    </div>
  )
}

export default ReviewPage
