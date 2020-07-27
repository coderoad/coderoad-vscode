import * as React from 'react'
import { ADMIN_MODE } from '../../environment'

type Props = {
  children: React.ReactElement
}

type State = {
  adminMode: boolean
}

type Action = { type: 'ADMIN_MODE_ON' | 'ADMIN_MODE_OFF' }

export type AdminContextType = { state: State; dispatch: (action: Action) => void }

const AdminContext = React.createContext<AdminContextType>({
  state: { adminMode: ADMIN_MODE },
  dispatch: () => {},
})

export default AdminContext

export const AdminProvider = (props: Props) => {
  const [state, dispatch] = React.useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case 'ADMIN_MODE_ON':
          return { ...state, adminMode: true }
        case 'ADMIN_MODE_OFF':
          return { ...state, adminMode: false }
        default:
          throw new Error()
      }
    },
    { adminMode: ADMIN_MODE },
  )
  return <AdminContext.Provider value={{ state, dispatch }}>{props.children}</AdminContext.Provider>
}

export const AdminConsumer = AdminContext.Consumer
