import * as React from 'react'
import useFetch from '../../../services/hooks/useFetch'
import { TUTORIAL_LIST_URL } from '../../../environment'
import { Form, Select } from '@alifd/next'

const FormItem = Form.Item
const Option = Select.Option

type TutorialList = Array<{ id: string; title: string; configUrl: string }>

interface Props {
  onTutorialLoad(url: string): void
}

const TutorialSelect = (props: Props) => {
  // load tutorial from a path to a tutorial list json
  const { data, error, loading } = useFetch<TutorialList>(TUTORIAL_LIST_URL)
  // TODO: display errors
  const selectState = loading ? 'loading' : error || !data ? 'error' : undefined
  return (
    <Form style={{ maxWidth: '500px' }}>
      <FormItem label="Select Tutorial:">
        <Select
          onChange={props.onTutorialLoad}
          style={{ width: '100%' }}
          placeholder="Tutorials..."
          state={selectState}
          size="large"
        >
          {data &&
            data.map((tutorial) => (
              <Option key={tutorial.id} value={tutorial.configUrl}>
                {tutorial.title}
              </Option>
            ))}
        </Select>
      </FormItem>
    </Form>
  )
}

export default TutorialSelect
