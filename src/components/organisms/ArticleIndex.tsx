import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Styles from 'lib/styles'
import Bar from 'components/atoms/Bar'

interface Props {
  headings: Heading[]
}

const styles = new Styles({
  container: `
    width: 300px;
    padding: 32px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.56) 100%);
    margin-left: 32px;
    border-radius: 8px;
    margin-top: 256px;
    height: 100%;
    position: sticky;
    top: 0;
  `,
  h2: `
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
  `,
  h3: `
    display: block;
    margin-bottom: 8px;
    padding-left: 16px;
    font-size: 12px;
    color: #333;
  `,
  h4: `
    display: block;
    margin-bottom: 8px;
    padding-left: 16px;
    font-size: 12px;
    color: #666;
  `
}).style

const ArticleIndex: React.VFC<Props> = ({ headings }) => {
  return (
    <div css={styles.container}>
      <div>
        <h3>Index</h3>
      </div>
      <Bar />
      <ul>
        {headings.map((heading: Heading) => {
          const labelStyle = styles[`h${heading.depth}` as keyof typeof styles]
          return (
            <li key={heading.value}>
              <span css={labelStyle} onClick={() => {}}>
                {heading.value}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ArticleIndex
