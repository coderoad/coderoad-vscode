import * as React from 'react'
import { Form } from '@alifd/next'

const FormItem = Form.Item

interface Props {
  onTutorialLoad(url: string): void
}

const TutorialFile = (props: Props) => {
  const [json, setJson] = React.useState<JSON | null>(null)

  const onChange = (evt: any) => {
    const files = evt.target.files

    if (!files.length) {
      alert('No file select')
      return
    }
    const uploadedFile = files[0]
    const reader = new FileReader()
    reader.onload = (e: any) => {
      // TODO: handle errors from bad JSON
      const fileJson: JSON = JSON.parse(e.target.result)
      setJson(fileJson)
    }
    reader.readAsText(uploadedFile)
  }

  return (
    <Form style={{ maxWidth: '600px' }}>
      <FormItem label="Load coderoad config.json">
        <input type="file" accept="application/json" onChange={onChange} />
      </FormItem>
      &nbsp;&nbsp;
    </Form>
  )
}

export default TutorialFile
