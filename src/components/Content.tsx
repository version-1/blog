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

    h3 {
      margin-top: 16px;
      margin-bottom: 16px;
    }

    h4 {
      margin-top: 8px;
      margin-bottom: 8px;
    }

    p {
      padding: 8px 0;
    }

    video,
    img {
      margin: 16px 0px;
      max-width: 100%;
    }

    table {
      margin-top: 16px;
      margin-bottom: 16px;
      width: 100%;
      overflow: scroll;
      text-align: left;
    }

    th {
      white-space: nowrap;
      padding: 4px;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }

    td {
      padding: 4px;
      text-align: left;
      padding: 4px;
      border-bottom: 1px solid #ccc;
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
