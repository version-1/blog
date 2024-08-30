import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/css'
import { blog } from 'lib/routes'
import { meta } from 'configs/constants'
import { mq } from 'constants/index'

const styles = {
  container: css`
    margin-top: 64px;
    font-size: 12px;
    padding: 32px;
    background: linear-gradient(351.16deg, #FFFFFF 6.73%, rgba(255, 255, 255, 0.62) 93.35%);
  `,
  content: css`
    max-width: 640px;
    text-align: center;
    margin: auto;
  `,
  navigation: css`
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
}

interface Props {
  lang: Lang
}

const menus = (language: Lang) => [
  {
    label: 'Top',
    to: blog.rootPath(language)
  },
  {
    label: 'About',
    to: blog.aboutPath(language)
  },
  { to: blog.categoryPath('engineering', language), label: 'Programming' },
  { to: blog.categoryPath('freelance', language), label: 'Career' },
  { to: blog.categoryPath('column', language), label: 'Column' },
  { to: meta.inquiry, label: 'Contact' }
]

const Footer: React.FC<Props> = ({ lang }) => {
  const list = menus(lang)
  return (
    <footer className={["footer", styles.container].join(' ')}>
      <div className={styles.content}>
        <ul className={styles.navigation}>
          {list.map((menu: { to: string; label: string }) => {
            return (
              <li key={menu.to}>
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
