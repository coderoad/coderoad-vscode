import * as React from 'react'
import { Dialog } from '@alifd/next'
import useFetch from '../../services/hooks/useFetch'
import * as TT from 'typings/tutorial'
import LoadingPage from '../Loading'

interface Props {
  url: string
  onLoadSummary(data: TT.Tutorial): void
  onReturnToSelection(): void
}

const LoadTutorialSummary = (props: Props) => {
  const { data, error, loading } = useFetch<TT.Tutorial>(props.url)
  if (loading) {
    return <LoadingPage text="Loading tutorial summary..." />
  }
  if (error) {
    console.log(`Failed to load tutorial summary: ${error}`)
    return <div>Error loading summary</div>
  }
  if (!data) {
    return (
      <Dialog
        title="Tutorial Not Found"
        visible={true}
        closeable={false}
        footerActions={['ok']}
        onOk={props.onReturnToSelection}
      >
        No data returned for tutorial
      </Dialog>
    )
  } else {
    // quick validation
    if (!data?.config?.repo) {
      return (
        <Dialog
          title="Invalid Tutorial"
          visible={true}
          closeable={false}
          footerActions={['ok']}
          onOk={props.onReturnToSelection}
        >
          Loaded data does not match tutorial format
        </Dialog>
      )
    }
    props.onLoadSummary(data)
  }
  return null
}

export default LoadTutorialSummary
