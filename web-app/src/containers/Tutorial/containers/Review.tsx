import * as React from 'react'
import * as T from 'typings'
import { Button, Icon } from '@alifd/next'
import Step from '../components/Step'
import Hints from '../components/Hints'
import Content from '../components/Content'
import { Theme } from '../../../styles/theme'
import AdminContext from '../../../services/admin/context'

interface Props {
  levels: T.LevelUI[]
  onResetToPosition(position: T.Position): void
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
  steps: {
    padding: '1rem 1rem',
  },
  adminNav: {
    position: 'absolute' as 'absolute',
    right: '1rem',
    lineHeight: '16px',
  },
}

const ReviewPage = (props: Props) => {
  const {
    state: { adminMode },
  } = React.useContext(AdminContext)
  const show = (status: T.ProgressStatus): boolean => {
    return adminMode || status !== 'INCOMPLETE'
  }
  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <div>Review</div>
      </div>

      <div css={styles.levels}>
        {props.levels.map((level: T.LevelUI, index: number) =>
          show(level.status) ? (
            <div key={level.id}>
              {adminMode && (
                <div css={styles.adminNav}>
                  <Button
                    type="normal"
                    warning
                    onClick={() =>
                      props.onResetToPosition({
                        levelId: level.id,
                        stepId: level.steps.length ? level.steps[0].id : null,
                        complete: false,
                      })
                    }
                  >
                    {level.id}&nbsp;
                    <Icon type="refresh" />
                  </Button>
                </div>
              )}
              <Content title={level.title} content={level.content} />

              <div css={styles.steps}>
                {level.steps.map((step: T.StepUI) => {
                  if (!step) {
                    return null
                  }
                  return show(step.status) ? (
                    <div key={step.id}>
                      {adminMode && (
                        <>
                          <div css={styles.adminNav}>
                            <Button
                              type="normal"
                              warning
                              onClick={() =>
                                props.onResetToPosition({ levelId: level.id, stepId: step.id, complete: false })
                              }
                            >
                              {step.id}&nbsp;
                              <Icon type="refresh" />
                            </Button>
                          </div>
                          <br />
                        </>
                      )}
                      <Step
                        key={step.id}
                        status={step.status}
                        displayAll={true}
                        content={step.content}
                        subtasks={step.subtasks}
                      />
                      <Hints hints={step.hints || []} />
                    </div>
                  ) : null
                })}
              </div>

              {index < props.levels.length - 1 ? <hr /> : null}
            </div>
          ) : null,
        )}
      </div>
    </div>
  )
}

export default ReviewPage
