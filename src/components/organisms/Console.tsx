import React from 'react'
import { Link } from 'gatsby'
import Styles from 'lib/styles'
import {
  rootPath,
  categoryPath,
  tagPath,
  pickupsPath,
  popularsPath
} from 'lib/routes'

const styles = new Styles({
  container: `
    max-width: 1000px;
    margin: auto;
    margin-top: 64px;
  `,
  content: `
    background: rgba(19, 11, 51, 0.6);
    border-radius: 8px;
    min-height: 380px;
    width: 640px;
  `,
  header: `
    background: rgba(19, 11, 51, 0.6);
    background: #f3f2f7;
    border-radius: 8px 8px 0px 0px;
    height: 24px;
    margin-bottom: 8px;
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
  nav: `
    display: flex;
    height: 100%;
    margin-left: 16px;

    li {
      cursor: pointer;
      position: relative;
      display: block;
      height: 12px;
      width: 12px;
      border-radius: 50%;
      background: black;
      margin-right: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    li span {
      display: block;
      font-size: 10px;
      transition: all 0.3 linear;
    }

    li:hover span {
      color: #22222290;
    }

    li:nth-child(1) {
      background: red;
      color: red;
    }
    li:nth-child(2) {
      background: orange;
      color: orange;
    }
    li:nth-child(3) {
      background: green;
      color: green;
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
    margin-bottom: 8px;

    li {
      padding-bottom: 2px;
      margin-right: 4px;
      border-bottom: 1px solid #BCFF9C;
    }

    li.active {
      font-weight: bold;
      border-bottom: 2px solid #BCFF9C;
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

    li.active {
      font-weight: bold;
      border-bottom: 2px solid #B2FFFA;
    }

    li > a {
      color: #B2FFFA;
    }
  `,
  pages: `
    display: flex;
    margin-bottom: 8px;

    li {
      margin-right: 8px;
      border-bottom: 1px solid white;
    }

    li > a{
      color: white;
    }

    li.active {
      font-weight: bold;
      border-bottom: 2px solid white;
    }
  `,
  postList: `
    margin-top: -64px;
    margin-left: 16px;
  `,
  cursor: `
    font-weight: bold;
    animation-name: blink;
    animation-duration: 1s;
    animation-iteration-count: infinite;

    @keyframes blink {
      from {opacity: 0;}
      to {opacity: 1;}
    }
  `
}).style

const menu = (language: Lang) => [
  { to: rootPath(language), label: 'New', disabled: false },
  { to: popularsPath(language), label: 'Popular', disabled: false },
  { to: pickupsPath(language), label: 'Pickup', disabled: language === 'en' },
  {
    to: categoryPath('engineering', language),
    label: 'Programming',
    disabled: false
  }
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
          <ul css={styles.nav}>
            <li>
              <span>x</span>
            </li>
            <li>
              <span>-</span>
            </li>
            <li>
              <span>+</span>
            </li>
          </ul>
        </div>
        <div css={styles.body}>
          <div css={styles.links}>
            <p>
              $ Hi there, thank you for visiting my blog. 👍 <br />
              Following links might help you find an article you are looking for.
            </p>
            <p>$ pages</p>
            <ul css={styles.pages}>
              {_menu.map((item: any) => {
                if (item.disabled) {
                  return null
                }
                return (
                  <li
                    key={item.to}
                    css={styles.menuItem}
                    className={`${path === item.to && 'active'}`}
                  >
                    <Link to={item.to}>{item.label}</Link>
                  </li>
                )
              })}
            </ul>
            <p>$ category</p>
            <ul css={styles.category}>
              {categories.map((category: string) => {
                const to = categoryPath(category, language)
                const active = to === path
                return (
                  <li key={category} className={`${active && `active`}`}>
                    <Link to={to}>/{category}</Link>
                  </li>
                )
              })}
            </ul>
            <p>$ tag</p>
            <ul css={styles.tag}>
              {tags.slice(0, 20).map((tag: string) => {
                const to = tagPath(tag, language)
                const active = to === path
                return (
                  <li key={tag} className={`${active && `active`}`}>
                    <Link to={to}>#{tag}</Link>
                  </li>
                )
              })}
              {tags.length > 20 ? '...' : ''}
            </ul>
            <p>$</p>
            <p>
              $ <span css={styles.cursor}>|</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Console
