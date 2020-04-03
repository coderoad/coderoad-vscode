import * as React from 'react'
import SelectTutorialForm from './SelectTutorialForm'
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
  const [page, setPage] = React.useState<'form' | 'summary'>('form')
  const [tab, setTab] = React.useState<'list' | 'url'>('list')
  const [url, setUrl] = React.useState<string | null>(null)
  const onTutorialLoad = (url: string) => {
    setUrl(url)
    setPage('summary')
  }
  return (
    <div css={styles.page}>
      {page === 'form' && <SelectTutorialForm url={url} onTutorialLoad={onTutorialLoad} tab={tab} setTab={setTab} />}
      {page === 'summary' && url && <LoadTutorialSummary url={url} send={props.send} onClear={() => setPage('form')} />}
    </div>
  )
}

export default SelectTutorialPage
