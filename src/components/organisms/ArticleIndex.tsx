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
    overflow: scroll;
    position: sticky;
    top: 0;
  `,
  label: `
    cursor: pointer;
    display: block;
    margin-bottom: 8px;
    transition: all 0.2s linear;

    &:hover {
      opacity: 0.6;
    }
  `,
  h2: `
    font-weight: bold;
  `,
  h3: `
    display: block;
    padding-left: 16px;
    font-size: 12px;
    color: #333;
  `,
  h4: `
    padding-left: 16px;
    font-size: 12px;
    color: #666;
  `
}).style

const ArticleIndex: React.VFC<Props> = ({ headings }) => {
  const list = headings.filter((heading: Heading) => heading.depth <= 3)
  if (list.length <= 0) {
    return null
  }
  return (
    <div css={styles.container}>
      <div>
        <h3>Index</h3>
      </div>
      <Bar />
      <ul>
        {list.map((heading: Heading) => {
          const labelStyle = styles[`h${heading.depth}` as keyof typeof styles]
          return (
            <li key={heading.value}>
              <span
                css={[styles.label, labelStyle]}
                onClick={() => {
                  const selector = heading.value
                    .replace(/[\.\(\)\?':@]/g, '')
                    .replace(/ /g, '-')
                  console.log(selector)
                  const target = document.getElementById(selector)
                  if (!target) {
                    return
                  }
                  target.scrollIntoView({
                    behavior: 'smooth'
                  })
                }}
              >
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
