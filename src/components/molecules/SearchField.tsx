import React, { useEffect, SyntheticEvent, useState, useRef } from 'react'
import Styles from 'lib/styles'
import Icon from 'atoms/Icon'

const styles = new Styles({
  container: `
    display: flex;
    align-items: center;
    background: white;
    border-radius: 16px;
    padding: 8px;
    margin: 8px;
    height: 32px;
    border: 1px solid #00004020;

    input {
      width: 100%;
      margin-left: 8px;
      border: 0;
    }

    input::placeholder {
      coor: #00004020;
    }

    input:focus {
      outline: 0;
    }
  `
}).style

interface Props {
  onChange?: (text: string) => void
  [key: string]: any
}

const SearchField: React.VFC<Props> = ({
  initialFocus,
  onChange,
  containerStyle,
  onFocus
}) => {
  const [text, setText] = useState('')
  const inputRef = useRef<any>()

  const onChangeText = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    setText(value)
    if (onChange) {
      onChange(value)
    }
  }

  useEffect(() => {
    if (initialFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div css={[styles.container, containerStyle && containerStyle]}>
      <Icon color="#00004020" icon="search" />
      <input
        ref={inputRef}
        type="text"
        value={text}
        onFocus={onFocus}
        onChange={onChangeText}
      />
    </div>
  )
}

export default SearchField
