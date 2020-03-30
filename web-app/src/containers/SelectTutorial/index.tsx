import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import SelectTutorialForm from './SelectTutorialForm'
import LoadTutorialSummary from './LoadTutorialSummary'

const styles = {
  page: {
    width: '100%',
  },
  header: {
    padding: '1rem',
  },
}

interface ContainerProps {
  send(action: T.Action): void
  context: T.MachineContext
}

interface TutorialsData {
  tutorials: TT.Tutorial[]
}

interface Props {
  send: any
  context: any
}

const SelectTutorialPage = (props: Props) => {
  const [url, setUrl] = React.useState<string | null>(null)
  return (
    <div css={styles.page}>
      {!url && (
        <div css={styles.header}>
          <SelectTutorialForm onUrlChange={setUrl} />
        </div>
      )}
      {url && <LoadTutorialSummary url={url} send={props.send} onClear={() => setUrl(null)} />}
    </div>
  )
}

export default SelectTutorialPage
