import * as React from 'react'
import * as TT from 'typings/tutorial'
import { Form } from '@alifd/next'

const FormItem = Form.Item

interface Props {
  onLoadSummary(data: TT.Tutorial): void
}

const styles = {
  uploadFileButton: {
    padding: '0.3rem 0.5rem',
    outline: '1px dotted rgb(51, 51, 51)',
    borderRadius: '0.2rem',
    fontWeight: 400,
    fontFamily:
      '-apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;',
  },
}

const TutorialFile = (props: Props) => {
  const onChange = (evt: any) => {
    evt.preventDefault()
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
        <br />
        <label style={styles.uploadFileButton}>
          Upload
          <input style={{ display: 'none' }} type="file" accept="application/json" onChange={onChange} />
        </label>
        <br />
      </FormItem>
      <br />
    </Form>
  )
}

export default TutorialFile
