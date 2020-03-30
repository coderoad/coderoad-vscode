import * as React from 'react'
import useFetch from '../../services/hooks/useFetch'
import { Form, Select } from '@alifd/next'
import { TUTORIAL_URL } from '../../environment'

const FormItem = Form.Item
const Option = Select.Option

const styles = {
  formWrapper: {
    padding: '1rem',
    width: '100%',
    height: 'auto',
  },
}

type TutorialList = Array<{ id: string; title: string; configUrl: string }>

interface Props {
  onUrlChange(url: string): void
}

const SelectTutorialForm = (props: Props) => {
  // load tutorial from a path to a tutorial list json
  const { data, error, loading } = useFetch<TutorialList>(TUTORIAL_URL)
  // TODO: display errors
  const selectState = loading ? 'loading' : error || !data ? 'error' : undefined
  return (
    <div css={styles.formWrapper}>
      <Form style={{ maxWidth: '500px' }}>
        <FormItem label="Select Tutorial:">
          <Select onChange={props.onUrlChange} style={{ width: '100%' }} placeholder="Tutorials..." state={selectState}>
            {data &&
              data.map((tutorial) => (
                <Option key={tutorial.id} value={tutorial.configUrl}>
                  {tutorial.title}
                </Option>
              ))}
          </Select>
        </FormItem>
      </Form>
    </div>
  )
}

export default SelectTutorialForm
