import React from 'react'
import Styles from 'lib/styles'
import { colors } from 'constants/index'

const styles = new Styles({
  base: `
    border: 0;
    border-radius: 36px;
    width: 100%;
    padding: 8px 16px;
    margin: 0 8px;

    &:focus {
      outline: none;
    }
  `,
  default: `
    color: white;
    background: #666;
  `,
  primary: `
    color: white;
    background: ${colors.primaryColor};
  `
}).style

interface Props {
  variant?: 'default' | 'primary'
  type?: 'button' | 'submit'
  onClick?: () => void
  children: JSX.Element | JSX.Element[]
}

const BlogButton: React.FC<Props> = ({ variant, type, onClick, children }) => {
  const variantStyle = styles[variant || 'default']

  return (
    <button className={[styles.base, variantStyle].join(' ')} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default BlogButton
