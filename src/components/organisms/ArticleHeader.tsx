import React from 'react'
import { Link } from 'gatsby'
import Styles from 'lib/styles'
import Category from 'components/atoms/Category'
import { tagPath } from 'lib/routes'
import { instance as i18next } from 'lib/i18next'

const styles = new Styles({
  header: `
  `,
  timestamp: `
    font-size: 10px;
    color: #00000050;
  `,
  title: `
    font-size: 24px;
    margin-bottom: 16px;
  `,
  categories: `
    display: flex;
    margin-bottom: 8px;

    li {
      margin-right: 8px;
    }
  `,
  tags: `
    display: flex;
    margin-bottom: 8px;

    li {
      display: block;
      font-size: 12px;
      margin-right: 8px;
    }

    a {
      color: #22222280;
      font-style: italic;
      transition: all 0.3s linear;
    }

    a:before {
      content: '#';
      color: #22222280;
      font-style: italic;
    }

    a:hover {
      color: #222222;
    }
  `,
  aside: `
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  `,
  languages: `
    display: flex;
    font-size: 12px;
    justify-content: flex-end;

    li {
      margin-right: 4px;
    }
  `
}).style

interface HeaderProps {
  post: Post
  meta: any
}

const langs = ['JA', 'EN']

const Header: React.FC<HeaderProps> = ({ post, meta }) => {
  const { createdAt, title, categories, language, tags } = post.frontmatter
  const hasAlternate = meta.alternate && Object.keys(meta.alternate).length > 0

  return (
    <div css={styles.header}>
      <div css={styles.nav}>
        {hasAlternate && (
          <ul css={styles.languages}>
            {langs.map((item: string, index: number) => {
              return (
                <React.Fragment key={index}>
                  <li>
                    {item.toLowerCase() === language ? (
                      item
                    ) : (
                      <Link to={meta.alternate[item.toLowerCase()]}>
                        {item}
                      </Link>
                    )}
                  </li>
                  {langs.length !== index + 1 && <li>|</li>}
                </React.Fragment>
              )
            })}
          </ul>
        )}
      </div>
      <div css={styles.aside}>
        {categories && (
          <Category category={categories[0]} language={language} />
        )}
        <div css={styles.timestamp}>{createdAt}</div>
      </div>
      <h1 css={styles.title} className="post-title">
        {title}
      </h1>
      <div css={styles.meta}>
        <ul css={styles.tags}>
          {tags.map((item: string) => {
            if (item === 'dummy') {
              return null
            }
            return (
              <li>
                <Link to={tagPath(item, language)}>
                  {i18next.t(`tags.${item}`)}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Header
