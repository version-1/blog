import React from 'react'
import { navigate, Link } from 'gatsby'
import { rootPath, aboutPath } from 'lib/routes'
import Styles from 'lib/styles'
import { showForm } from 'organisms/SearchForm'
import { showForm as showMenu } from 'organisms/Menu'
import Icon from 'atoms/Icon'
import { mq } from 'constants/index'
import constants from 'config/constants'

const menus = (language: Lang) => [
  { to: rootPath(language), text: 'Top' },
  { to: aboutPath(language), text: 'About' }
]

const styles = new Styles({
  container: `
    padding: 8px 0px;
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
      font-size: 14px;
    }
  `,
  navigation: `
    width: 100%;
    display: flex;
    padding-left: 32px;
    justify-content: space-between;
    align-items: center;

    ${mq.md} {
      justify-content: flex-end;
    }
  `,
  modalTitle: `
    padding: 32px;
  `,
  icon: `
    cursor: pointer;
    position: relative;
    top: 2px;
  `,
  select: `
    background: transparent;
    border: 0;
    color: #00004080;

    &:focus {
      outline: none;
    }
  `,
  right: `
    display: flex;
    align-items: center;

    li {
      margin-right: 16px;
    }
  `,
  hamburger: `
    display: none;
    ${mq.md} {
      display: block;
    }
  `,
  menuList: `
    ${mq.md} {
      display: none;
    }
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

  const onChangeLanguage = (e: any) => {
    const lan = e.target.value
    if (lan === language) {
      return
    }
    navigate(rootPath(lan))
  }

  const onClickMenu = () => {
    showMenu(language)
  }

  return (
    <header css={styles.container}>
      <div css={styles.content}>
        <div className="brand-logo">
          <Link to={rootPath(language)}>Ver.1.0</Link>
        </div>
        <nav className="navigation" role="navigation" css={styles.navigation}>
          <div css={styles.menuList}>
            <MenuList list={list} />
          </div>
          <ul css={styles.right}>
            <li>
              <select css={styles.select} onChange={onChangeLanguage}>
                <option value="en" selected={language === 'en'}>
                  English
                </option>
                <option value="ja" selected={language === 'ja'}>
                  日本語
                </option>
              </select>
            </li>
            <li>
              <Icon
                css={styles.icon}
                color="#00004080"
                icon="search"
                onClick={showForm}
              />
            </li>
            <li>
              <a href={constants.meta.inquiry}>
                <Icon css={styles.icon} color="#00004080" icon="mail" />
              </a>
            </li>
            <li css={styles.hamburger}>
              <Icon
                css={styles.icon}
                color="#00004080"
                icon="menu"
                onClick={onClickMenu}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default React.memo(Navbar)
