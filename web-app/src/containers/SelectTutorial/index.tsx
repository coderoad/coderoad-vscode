import * as TT from 'typings/tutorial'
import * as React from 'react'
import SelectTutorialForm from './SelectTutorialForm'
import TutorialOverview from '../../components/TutorialOverview'
import LoadTutorialSummary from './LoadTutorialSummary'

const styles = {
  page: {
    position: 'relative' as 'relative',
    height: 'auto',
    width: '100%',
  },
  selectPage: {
    padding: '1rem',
  },
}

interface Props {
  send: any
  context: any
}

const SelectTutorialPage = (props: Props) => {
  const [data, setData] = React.useState<TT.Tutorial | null>()
  const [page, setPage] = React.useState<'form' | 'loading' | 'summary'>('form')
  const [tab, setTab] = React.useState<'list' | 'url'>('list')
  const [url, setUrl] = React.useState<string | null>(null)

  const onNext = () => {
    props.send({
      type: 'TUTORIAL_START',
      payload: {
        tutorial: data,
      },
    })
  }
  const onTutorialLoad = (url: string) => {
    setUrl(url)
    setPage('loading')
  }
  const onSetDataFromUrl = (d: TT.Tutorial) => {
    setData(d)
    setPage('summary')
  }
  const onClear = () => {
    setData(null)
    setPage('form')
  }
  return (
    <div css={styles.page}>
      {page === 'form' && <SelectTutorialForm url={url} onTutorialLoad={onTutorialLoad} tab={tab} setTab={setTab} />}
      {page === 'loading' && url && <LoadTutorialSummary url={url} onSetDataFromUrl={onSetDataFromUrl} />}
      {page === 'summary' && data && <TutorialOverview onNext={onNext} tutorial={data} onClear={onClear} />}
    </div>
  )
}

export default SelectTutorialPage
