import React from 'react'
import { Link } from 'gatsby'
import Styles from 'lib/styles'
import { categoryPath } from 'lib/routes'
import SearchField from 'components/molecules/SearchField'

const styles = new Styles({
  container: `
    max-width: 1000px;
    margin: auto;
  `,
  content: `
    background: rgba(19, 11, 51, 0.6);
    border-radius: 8px;
    min-height: 380px;
    width: 640px;
  `,
  header: `
    background: rgba(19, 11, 51, 0.6);
    border-radius: 8px;
    height: 64px;
    padding: 16px;
    transition: all 0.2s linear;

    a {
      display: block;
      color: white;
    }

    .underline {
      margin-top: 8px;
      height: 6px;
      opacity: 0;
      transition: all 0.2s linear;
      background: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 120%);
    }

    .underline.active {
      opacity: 1;
    }

    ul {
      font-weight: bold;
      display: flex;
      align-items: center;
    }

    li {
      margin-right: 16px;
    }
  `,
  links: `
    padding: 16px;
    padding-top: 0px;
    color: #ACACAC;
  `,
  search: `
    margin: 16px;
    width: 300px;
  `,
  body: `

  `,
  menuItem: `
    &:hover .underline {
      opacity: 1;
    }
  `,
  category: `
    display: flex;
    flex-wrap: wrap;
    li {
      padding-bottom: 2px;
      margin-right: 4px;
      border-bottom: 1px solid #BCFF9C;
    }

    li > a {
      color: #BCFF9C;
    }
  `,
  tag: `
    display: flex;
    flex-wrap: wrap;
    li {
      margin-right: 4px;
      padding-bottom: 2px;
      border-bottom: 1px solid #B2FFFA;
    }

    li > a {
      color: #B2FFFA;
    }
  `,
  postList: `
    margin-top: -64px;
    margin-left: 16px;
  `
}).style

const menu = (language: Lang) => [
  { to: '/', label: 'New' },
  { to: '/popular', label: 'Popular' },
  { to: '/pickup', label: 'Pickup' },
  { to: categoryPath('/categories/pickup', language), label: 'Programming' }
]

interface Props {
  path: string
  context: any
}

const Console: React.FC<Props> = ({ path, context }) => {
  const { language } = context
  const { categories, tags } = context.layout
  const _menu = menu(language)

  return (
    <div css={styles.container}>
      <div css={styles.content}>
        <div css={styles.header}>
          <ul>
            {_menu.map((item: any) => (
              <li css={styles.menuItem}>
                <Link to={item.to}>{item.label}</Link>
                <div
                  className={
                    path === item.to ? 'underline active' : 'underline'
                  }
                ></div>
              </li>
            ))}
          </ul>
        </div>
        <div css={styles.body}>
          <div css={styles.search}>
            <SearchField placeholder="Input search text" />
          </div>
          <div css={styles.links}>
            <p>$ category</p>
            <ul css={styles.category}>
              {categories.map((category: string) => {
                return (
                  <li key={category}>
                    <Link to={category}>/{category}</Link>
                  </li>
                )
              })}
            </ul>
            <p>$ tag</p>
            <ul css={styles.tag}>
              {tags.slice(0, 20).map((tag: string) => {
                return (
                  <li key={tag}>
                    <Link to={tag}>#{tag}</Link>
                  </li>
                )
              })}
              {tags.length > 20 ? '...' : ''}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Console
