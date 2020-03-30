import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { Form, Select } from '@alifd/next'
import useFetch from '../../services/hooks/useFetch'

const FormItem = Form.Item
const Option = Select.Option

interface ContainerProps {
  send(action: T.Action): void
  context: T.MachineContext
}

interface TutorialsData {
  tutorials: TT.Tutorial[]
}

interface GitHubFetchProps {
  url: string
}

const GitHubFetch = ({ url }: GitHubFetchProps) => {
  const { data, error, loading } = useFetch(url)
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  return <div>{JSON.stringify(data)}</div>
}

const tutorials = [
  {
    id: '1',
    title: 'Basic Node & Express',
    configUrl: 'https://raw.githubusercontent.com/coderoad/fcc-basic-node-and-express/master/coderoad-config.json',
  },
  {
    id: '2',
    title: 'Learn NPM',
    configUrl: 'https://raw.githubusercontent.com/coderoad/fcc-learn-npm/master/coderoad-config.json',
  },
]

interface Props {
  send: any
  context: any
}

const SelectTutorialPage = ({ send }: Props) => {
  const [url, setUrl] = React.useState<string | null>(null)
  const handleUrlChange = (value: string) => {
    setUrl(value)
  }
  return (
    <div>
      <Form style={{ maxWidth: '500px' }}>
        <FormItem label="Select Tutorial:">
          <Select onChange={handleUrlChange} style={{ width: '100%' }}>
            {tutorials.map((tutorial) => (
              <Option key={tutorial.id} value={tutorial.configUrl}>
                {tutorial.title}
              </Option>
            ))}
          </Select>
        </FormItem>
      </Form>
      {url && <GitHubFetch url={url} />}
    </div>
  )
}

export default SelectTutorialPage
