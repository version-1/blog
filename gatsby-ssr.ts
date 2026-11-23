import React from 'react'
import type { GatsbySSR } from 'gatsby'
import { cache } from '@emotion/css'
import './src/styles/global.css'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents
}) => {
  const styles = Object.entries(cache.inserted).filter(
    ([, value]) => typeof value === 'string'
  ) as [string, string][]

  if (styles.length === 0) {
    return
  }

  setHeadComponents([
    React.createElement('style', {
      key: 'emotion-css',
      'data-emotion': `css ${styles.map(([id]) => id).join(' ')}`,
      dangerouslySetInnerHTML: {
        __html: styles.map(([, css]) => css).join('')
      }
    })
  ])
}
