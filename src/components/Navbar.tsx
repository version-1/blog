import React from 'react'
import Link from 'atoms/Link'
import { rootPath, aboutPath } from 'lib/routes'
import Styles from 'lib/styles'
import SearchForm from 'organisms/SearchForm'
import SearchField from 'molecules/SearchField'
import Modal from 'components/organisms/Modal'

const menus = (language: Lang) => [
  { to: rootPath(language), text: 'Top' },
  { to: aboutPath(language), text: 'About' },
  { to: '', text: 'Contact' }
]

const styles = new Styles({
  container: `
    background: linear-gradient(180deg, rgba(251, 251, 251, 0.9) 0%, rgba(251, 251, 251, 0.792) 100%);
  `,
  content: `
    display: flex;
    align-items: center;
    max-width: 1000px;
    margin: auto;
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
    padding-left: 32px;
    justify-content: space-between;
    align-items: center;
  `
}).style

const MenuList = ({ list }: any) => {
  return (
    <ul css={styles.menu} className="nav-link-list">
      {list.map((menu: { text: string; to: string }, idx: number) => (
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
  const onShow = () => {
    Modal.show({
      header: <></>,
      content: <SearchForm />
    })
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
          <SearchField onFocus={onShow} />
        </nav>
      </div>
    </header>
  )
}

export default React.memo(Navbar)
