import * as React from 'react'
import * as T from 'typings'
import { Switch } from '@alifd/next'
import Steps from '../components/Steps'
import Content from '../components/Content'

interface Props {
  levels: T.LevelUI[]
}

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
  title: {
    marginLeft: '0.5rem',
  },
  control: {
    display: 'flex' as 'flex',
    alignItems: 'center',
    fontSize: '70%',
  },
  levels: {
    paddingBottom: '2rem',
  },
}

const ReviewPage = (props: Props) => {
  const [stepVisibility, setStepVisibility] = React.useState(false)
  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <div>Review</div>
        <div css={styles.control}>
          <span>Show steps&nbsp;</span>
          <Switch checked={stepVisibility} onChange={(checked) => setStepVisibility(checked)} />
        </div>
      </div>
      <div css={styles.levels}>
        {props.levels.map((level: T.LevelUI, index: number) => (
          <div key={level.id}>
            <div>
              <Content title={level.title} content={level.content} />
              {stepVisibility ? <Steps steps={level.steps} displayAll /> : null}
            </div>
            {/* divider */}
            {index < props.levels.length - 1 ? <hr /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewPage
