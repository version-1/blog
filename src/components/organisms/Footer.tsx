import React from 'react'
import Link from 'atoms/Link'
import Styles from 'lib/styles'
import { rootPath, categoryPath, aboutPath } from 'lib/routes'
import constants from 'config/constants'
import { mq } from 'constants/index'

const styles = new Styles({
  container: `
    margin-top: 64px;
    font-size: 12px;
    padding: 32px;
    background: linear-gradient(351.16deg, #FFFFFF 6.73%, rgba(255, 255, 255, 0.62) 93.35%);
  `,
  content: `
    max-width: 640px;
    text-align: center;
    margin: auto;
  `,
  navigation: `
    display: flex;
    justify-content: space-evenly;
    padding: 16px;

    a {
      color: inherit;
    }

    ${mq.md} {
      display: block;

      li {
        margin-bottom: 8px;
      }
    }
  `
}).hoge

interface Props {
  lang: Lang
}

const menus = (language: Lang) => [
  {
    label: 'Top',
    to: rootPath(language)
  },
  {
    label: 'About',
    to: aboutPath(language)
  },
  { to: categoryPath('engineering', language), label: 'Programming' },
  { to: categoryPath('freelance', language), label: 'Career' },
  { to: categoryPath('column', language), label: 'Column' },
  { to: constants.meta.inquiry, label: 'Contact' }
]

const Footer: React.FC<Props> = ({ lang }) => {
  const list = menus(lang)
  return (
    <footer css={styles.container} className="footer">
      <div css={styles.content}>
        <ul css={styles.navigation}>
          {list.map((menu: { to: string; label: string }) => {
            return (
              <li>
                <Link to={menu.to}>{menu.label}</Link>
              </li>
            )
          })}
        </ul>
        <p className="copyright">
          Copyright © 2018 So Far , So Tech All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
