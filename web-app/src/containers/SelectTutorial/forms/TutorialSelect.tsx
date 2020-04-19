import * as React from 'react'
import { Form, Select } from '@alifd/next'
import useFetch from '../../../services/hooks/useFetch'
import { TUTORIAL_LIST_URL } from '../../../environment'

const FormItem = Form.Item
const Option = Select.Option

type TutorialItem = { id: string; title: string; description: string; url: string }
type TutorialList = TutorialItem[]

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
              <Option key={tutorial.url} value={tutorial.url}>
                {tutorial.title}
              </Option>
            ))}
        </Select>
      </FormItem>
    </Form>
  )
}

export default TutorialSelect
