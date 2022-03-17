import React from 'react'
import Styles from 'lib/styles'
import { mq } from 'constants/index'

const styles = new Styles({
  container: `
    margin-bottom: 64px;
    line-height: 180%;
    letter-spacing: 0.2px;
    font-size: 16px;
    ${mq.md} {
      font-size: 14px;
    }

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

    aside {
      font-size: 10px;
    }

    .related-post:before {
      margin-top: 16px;
      border-radius: 8px 8px 0px 0px;
      background: #3fb4e461;
      padding: 0px 16px;
      font-size: 12px;
      color: white;
      content: 'Pick!';
      display: block;
    }

    .related-post ul {
      background: #87ceeb30;
      border-radius: 0px 0px 8px 8px;
      padding: 16px;
      padding-bottom: 8px;
      margin: 0;
      margin-bottom: 16px;
    }

    .related-post li {
      list-style-type: none;
      color: #0066C5;
      padding-left: 16px;
      font-size: 12px;
    }

    .related-post li:before {
      font-size: 6px;
      position: relative;
      bottom: 2px;
      margin-right: 16px;
      margin-left: -8px;
      content: '■';
      color: #0066C5;
    }

    .related-post li a {
      color: #0066C5;
    }

    p > code.language-text {
      font-size: 12px;
      color: #ff4545 !important;
      background: #f5f5f5 !important;
      padding: 2px 4px !important;
      border: 1px solid lightgray;
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
