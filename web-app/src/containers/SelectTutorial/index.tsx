import { useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import ErrorView from '../../components/Error'
import LoadingPage from '../Loading'
import SelectTutorial from './SelectTutorial'

interface ContainerProps {
  send(action: T.Action): void
  context: T.MachineContext
}

interface TutorialsData {
  tutorials: TT.Tutorial[]
}

const SelectPageContainer = (props: ContainerProps) => {
  return <div>SelectTutorial</div>
}

export default SelectPageContainer
