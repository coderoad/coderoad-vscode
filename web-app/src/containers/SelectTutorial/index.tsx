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
  const [url, setUrl] = React.useState<string | null>(null)
  return (
    <div css={styles.page}>
      {!url && <SelectTutorialForm onUrlChange={setUrl} />}
      {url && <LoadTutorialSummary url={url} send={props.send} onClear={() => setUrl(null)} />}
    </div>
  )
}

export default SelectTutorialPage
