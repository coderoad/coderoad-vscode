import * as React from 'react'
import { send } from '../../utils/vscode'

import Cond from '../../components/Cond'
import Loading from '../../components/Loading'
import SummaryPage from './SummaryPage'
import LevelPage from './LevelPage'
import StagePage from './StagePage'

interface Props {
  state: any
}

const Tutorial = (props: Props) => {
  return (
    <div>
      <Cond state={props.state} path="Tutorial.LoadNext">
        <Loading />
      </Cond>
      <Cond state={props.state} path="Tutorial.Summary">
        <SummaryPage state={props.state} send={send} />
      </Cond>
      <Cond state={props.state} path="Tutorial.Level">
        <LevelPage state={props.state} send={send} />
      </Cond>
      <Cond state={props.state} path="Tutorial.Stage">
        <StagePage state={props.state} send={send} />
      </Cond>
    </div>
  )
}

export default Tutorial
