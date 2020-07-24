import * as TT from 'typings/tutorial'
import * as React from 'react'
import { Radio } from '@alifd/next'
import TutorialSelect from './forms/TutorialSelect'
import TutorialUrl from './forms/TutorialUrl'
import TutorialFile from './forms/TutorialFile'

const styles = {
  formWrapper: {
    padding: '1rem',
    width: '100wvw',
    height: 'auto',
  },
}

interface Props {
  tab: string
  setTab(tab: 'list' | 'url'): void
  url: string | null
  onTutorialLoadFromUrl(url: string): void
  onLoadSummary(data: TT.Tutorial | null): void
}

const SelectTutorialForm = (props: Props) => {
  return (
    <div css={styles.formWrapper}>
      <Radio.Group
        style={{ marginLeft: 8 }}
        shape="button"
        value={props.tab}
        // @ts-ignore ts lib validation issue
        onChange={props.setTab}
      >
        <Radio value="list">List</Radio>
        <Radio value="url">URL</Radio>
        <Radio value="file">File</Radio>
      </Radio.Group>
      <br />
      <br />
      {props.tab === 'list' && <TutorialSelect onTutorialLoad={props.onTutorialLoadFromUrl} />}
      {props.tab === 'url' && <TutorialUrl onTutorialLoad={props.onTutorialLoadFromUrl} defaultUrl={props.url || ''} />}
      {props.tab === 'file' && <TutorialFile onLoadSummary={props.onLoadSummary} />}
    </div>
  )
}

export default SelectTutorialForm
