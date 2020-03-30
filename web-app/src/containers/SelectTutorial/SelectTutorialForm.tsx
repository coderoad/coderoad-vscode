import * as React from 'react'
import useFetch from '../../services/hooks/useFetch'
import { Form, Select } from '@alifd/next'

const FormItem = Form.Item
const Option = Select.Option

// configurable url to tutorials
const tutorialUrl = 'https://raw.githubusercontent.com/coderoad/tutorials/master/tutorials.json'

type TutorialList = Array<{ id: string; title: string; configUrl: string }>

interface Props {
  onUrlChange(url: string): void
}

const SelectTutorialForm = (props: Props) => {
  const { data, error, loading } = useFetch<TutorialList>(tutorialUrl)
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  if (!data) {
    return <div>No data returned</div>
  }
  return (
    <Form style={{ maxWidth: '500px' }}>
      <FormItem label="Select Tutorial:">
        <Select onChange={props.onUrlChange} style={{ width: '100%' }} placeholder="Tutorials...">
          {data.map((tutorial) => (
            <Option key={tutorial.id} value={tutorial.configUrl}>
              {tutorial.title}
            </Option>
          ))}
        </Select>
      </FormItem>
    </Form>
  )
}

export default SelectTutorialForm
