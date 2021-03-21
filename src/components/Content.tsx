import React from 'react'
import Styles from 'lib/styles'

const styles = new Styles({
  container: `
    margin-bottom: 64px;
    line-height: 180%;
    letter-spacing: 0.2px;

    ul {
      padding-left: 16px;
      margin-top: 32px;
      margin-bottom: 32px;
    }

    ul li {
      list-style-type: square;
      margin-bottom: 8px;
    }

    ol {
      padding-left: 16px;
      margin-top: 32px;
      margin-bottom: 32px;
    }

    h2 {
      margin-top: 32px;
      margin-bottom: 32px;
    }

    p {
      padding: 8px 0;
    }
  `
}).style

export const HTMLContent: React.FC<Props> = ({ content, className }) => {
  return (
    <div css={styles.container} className={className} dangerouslySetInnerHTML={{ __html: content }} />
  )
}

interface Props {
  content: string
  className: string
}

const Content: React.FC<Props> = ({ content, className }) => (
  <div css={styles.container} className={className}>{content}</div>
)

export default Content
