import React, { SyntheticEvent, useState } from 'react'
import Link from 'atoms/Link'
import { rootPath, categoryPath, aboutPath } from 'lib/routes'
import Styles from 'lib/styles'
import Icon from 'components/atoms/Icon'

const menus = (language: Lang) => [
  { to: rootPath(language), text: 'Top' },
  { to: aboutPath(language), text: 'About' },
  { to: categoryPath('engineering', language), text: 'Programming' },
  { to: categoryPath('freelance', language), text: 'Career' },
  { to: categoryPath('column', language), text: 'Column' },
  { to: '', text: 'Contact' }
]

const styles = new Styles({
  container: `
    background: linear-gradient(180deg, rgba(251, 251, 251, 0.9) 0%, rgba(251, 251, 251, 0.792) 100%);
  `,
  content: `
    display: flex;
    align-items: center;
    max-width: 892px;
  `,
  menu: `
    display: flex;

    li {
      margin-right: 16px;
    }

    a {
      color: #48434F;
    }
  `,
  navigation: `
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  search: `
    display: flex;
    align-items: center;
    background: white;
    border-radius: 8px;
    padding: 8px;
    height: 32px;

    input {
      border: 0;
    }

    input:focus {
      outline: 0;
    }
  `
}).style

const MenuList = ({ list }) => {
  return (
    <ul css={styles.menu} className="nav-link-list">
      {list.map((menu, idx) => (
        <li className="nav-link-item" key={idx}>
          <Link to={menu.to}>{menu.text}</Link>
        </li>
      ))}
    </ul>
  )
}

interface Props {
  language: Lang
}

const Navbar: React.VFC<Props> = ({ language }) => {
  const list = menus(language)
  const [value, setValue] = useState('')

  const onChangeText = (e: SyntheticEvent<HTMLInputElement>) => {
    setValue((e.target as HTMLInputElement).value)
  }

  return (
    <header css={styles.container}>
      <div css={styles.content}>
        <div className="brand-logo">
          <Link to={rootPath(language)}>Ver.1.0</Link>
        </div>
        <nav className="navigation" role="navigation" css={styles.navigation}>
          <div className="nav-links hide-on-med-and-down">
            <MenuList list={list} />
          </div>
          <div css={styles.search}>
            <Icon icon="search" />
            <input type="text" value={value} onChange={onChangeText} />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default React.memo(Navbar)
