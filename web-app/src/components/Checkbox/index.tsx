import * as React from 'react'

const styles = {
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    border: '1px solid black',
  },
  loading: {
    backgroundColor: 'red',
  },
}

interface Props {
  status: 'COMPLETE' | 'INCOMPLETE' | 'ACTIVE'
}

const Checkbox = (props: Props) => {
  const onChange = () => {
    /* read only */
  }

  const checked = props.status === 'COMPLETE'

  return (
    <div css={styles.box}>
      <label>
        <input css={styles.input} type="checkbox" checked={checked} onChange={onChange} />
      </label>
    </div>
  )
}

export default Checkbox
