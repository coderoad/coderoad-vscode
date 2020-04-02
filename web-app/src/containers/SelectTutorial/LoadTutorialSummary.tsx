import * as React from 'react'
import useFetch from '../../services/hooks/useFetch'
import * as TT from 'typings/tutorial'
import TutorialOverview from '../../components/TutorialOverview'
import Loading from '../Loading'

interface Props {
  url: string
  send: any
  onClear(): void
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
  const onNext = () => {
    props.send({
      type: 'TUTORIAL_START',
      payload: {
        tutorial: data,
      },
    })
  }
  return <TutorialOverview onNext={onNext} tutorial={data} onClear={props.onClear} />
}

export default LoadTutorialSummary
