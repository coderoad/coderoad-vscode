import * as React from 'react'
import * as TT from 'typings/tutorial'
import { Form } from '@alifd/next'

const FormItem = Form.Item

interface Props {
  onLoadSummary(data: TT.Tutorial): void
}

const TutorialFile = (props: Props) => {
  const onChange = (evt: any) => {
    const files = evt.target.files

    if (!files.length) {
      alert('No file select')
      return
    }
    const uploadedFile = files[0]
    const reader = new FileReader()
    reader.onload = (e: any) => {
      // TODO: handle errors from invalid JSON
      const fileJson: TT.Tutorial = JSON.parse(e.target.result)
      props.onLoadSummary(fileJson)
    }
    reader.readAsText(uploadedFile)
  }

  return (
    <Form style={{ maxWidth: '600px' }}>
      <FormItem label="Load coderoad config.json">
        <input type="file" accept="application/json" onChange={onChange} />
      </FormItem>
      <br />
    </Form>
  )
}

export default TutorialFile
