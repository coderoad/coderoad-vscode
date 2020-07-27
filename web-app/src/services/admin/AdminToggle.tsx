import * as React from 'react'
import { css, jsx } from '@emotion/core'
import { Switch } from '@alifd/next'
import AdminContext, { AdminContextType } from './context'

const styles = {
  container: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },
  label: {
    marginBottom: '4px',
  },
}

type Props = {}

const AdminToggle = (props: Props) => {
  const { state, dispatch } = React.useContext<AdminContextType>(AdminContext)
  return (
    <div css={styles.container}>
      <div css={styles.label}>Admin Mode</div>
      <Switch
        checked={state.adminMode}
        onChange={(checked: boolean) => dispatch({ type: checked ? 'ADMIN_MODE_ON' : 'ADMIN_MODE_OFF' })}
      />
    </div>
  )
}

export default AdminToggle
