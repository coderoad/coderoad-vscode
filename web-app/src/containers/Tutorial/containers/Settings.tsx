import Button from 'components/Button'
import React, { useState } from 'react'
import { Theme } from '../../../styles/theme'
import Reset from '../components/Reset'

import * as T from 'typings'

const styles = {
  flexColumn: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
  },
  container: (theme: Theme) => ({
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    backgroundColor: theme['$color-white'],
    height: 'auto',
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
  content: {
    padding: '0.5rem',
  },
  menu: {},
  menuItem: {
    display: 'flex' as 'flex',
    border: '1px solid rgb(173, 173, 173)',
    borderRadius: '5px',
    padding: '0.5rem',
  },
  menuItemHeader: {
    fontWeight: 'bold' as 'bold',
  },
  menuItemContent: {},
  menuItemButton: {
    marginLeft: 'auto' as 'auto',
  },
}

interface Props {
  levels: T.LevelUI[]
  onResetToPosition(position: T.Position): void
}

const SettingsPage = (props: Props) => {
  const onReset = () => {
    const level: T.LevelUI | null = props.levels.length ? props.levels[0] : null
    if (level) {
      props.onResetToPosition({
        levelId: level.id,
        stepId: null,
        complete: false,
      })
    }
  }
  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <div>Settings</div>
      </div>
      <div css={styles.content}>
        <div css={styles.menu}>
          <div css={styles.menuItem}>
            <div css={styles.flexColumn}>
              <div css={styles.menuItemHeader}>Reset Tutorial</div>
              <div css={styles.menuItemContent}>
                This will reset the whole tutorial and change the source files back to the first level and first task
                checkpoint. This will reset the whole tutorial and change the source files back to the first level and
                first task checkpoint. This will reset the whole tutorial and change the source files back to the first
                level and first task checkpoint.
              </div>
            </div>
            <Reset style={styles.menuItemButton} warning onReset={onReset} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
