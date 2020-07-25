import * as React from 'react'
import * as T from 'typings'
import { Switch } from '@alifd/next'
import Steps from '../components/Steps'
import Content from '../components/Content'
import { Theme } from '../../../styles/theme'

interface Props {
  levels: T.LevelUI[]
}

const styles = {
  container: (theme: Theme) => ({
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    height: 'auto',
    backgroundColor: theme['$color-white'],
    paddingBottom: '2rem',
  }),
  header: (theme: Theme) => ({
    display: 'flex' as 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '2rem',
    backgroundColor: theme['$color-fill1-2'],
    fontSize: '1rem',
    lineHeight: '1rem',
    padding: '10px 0.4rem',
  }),
  title: {
    marginLeft: '0.5rem',
  },
  control: {
    display: 'flex' as 'flex',
    alignItems: 'center',
    fontSize: '70%',
  },
  levels: {},
}

const ReviewPage = (props: Props) => {
  const [stepVisibility, setStepVisibility] = React.useState(true)
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
          <>
            <Content title={level.title} content={level.content} />
            {stepVisibility ? <Steps steps={level.steps} displayAll /> : null}
            {index < props.levels.length - 1 ? <hr /> : null}
          </>
        ))}
      </div>
    </div>
  )
}

export default ReviewPage
