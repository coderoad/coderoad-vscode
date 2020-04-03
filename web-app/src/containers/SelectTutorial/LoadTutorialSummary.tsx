import * as React from 'react'
import useFetch from '../../services/hooks/useFetch'
import * as TT from 'typings/tutorial'
import Loading from '../Loading'

interface Props {
  url: string
  onLoadSummary(data: TT.Tutorial): void
}

const LoadTutorialSummary = (props: Props) => {
  const { data, error, loading } = useFetch<TT.Tutorial>(props.url)
  if (loading) {
    return <Loading text="Loading tutorial summary..." />
  }
  // TODO: improve error handling
  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  if (!data) {
    return <div>No data returned for tutorial</div>
  }
  props.onLoadSummary(data)
  return null
}

export default LoadTutorialSummary
