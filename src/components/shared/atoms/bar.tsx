import React from 'react'
import Style from 'lib/styles'
import { colors } from 'constants/index'

const Bar = ({ style }: { style?: string }) => {
  const styleStr = `
        margin-top: 16px;
        margin-bottom: 32px;
        height: 4px;
        border-radius: 4px;
        background: ${colors.primaryColor};
    `
  return <div className={[Style.css(styleStr), style && Style.css(style)].join(' ')} />
}

export default Bar
