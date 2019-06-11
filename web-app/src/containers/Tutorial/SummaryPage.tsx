import * as React from 'react'
import DataContext from '../../utils/DataContext'
import Summary from '../../components/Summary'

interface PageProps {
  send(action: string): void
  state: any
}

const SummaryPage = (props: PageProps) => {
  const { data } = React.useContext(DataContext)
  return <Summary data={data} onNext={() => props.send('LOAD_NEXT')} />
}

export default SummaryPage
