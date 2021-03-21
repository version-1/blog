import React from 'react'
import Styles from 'lib/styles'
import { colors } from 'constants/index'

const Bar = ({ style }: { style?: string }) => {
  const styleStr = `
        margin-top: 16px;
        margin-bottom: 32px;
        height: 4px;
        border-radius: 4px;
        background: ${colors.primaryColor};
    `
  return <div css={[Styles.css(styleStr), style && Styles.css(style)]} />
}

export default Bar
