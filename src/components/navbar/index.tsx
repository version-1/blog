import React from 'react'
import { navigate, Link } from 'gatsby'
import { blog } from 'lib/routes'
import { meta } from 'configs/constants'
import { showForm } from '../shared/organisms/searchForm'
import { showForm as showMenu } from '../shared/organisms/menu'
import Icon from '../shared/atoms/icon'
import { LogoIcon } from '../shared/atoms/specialIcon'
import * as styles from './index.module.scss'

const menus = (language: Lang) => [
  { to: blog.rootPath(language), text: 'Top' },
  { to: blog.aboutPath(language), text: 'About' }
]

const MenuList = ({ list }: any) => {
  return (
    <ul className={[styles.menu, 'nav-link-list'].join(' ')}>
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
    navigate(blog.rootPath(lan))
  }

  const onClickMenu = () => {
    showMenu(language)
  }

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div className="brand-logo">
          <Link to={blog.rootPath(language)}>
            <LogoIcon />
          </Link>
        </div>
        <nav role="navigation" className={styles.navigation}>
          <div className={styles.menuList}>
            <MenuList list={list} />
          </div>
          <ul className={styles.right}>
            <li>
              <select
                className={styles.select}
                defaultValue={language}
                onChange={onChangeLanguage}
              >
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </li>
            <li>
              <span className={styles.icon}>
                <Icon
                  size={18}
                  color="#00004080"
                  icon="search"
                  onClick={showForm}
                />
              </span>
            </li>
            <li>
              <a href={meta.inquiry}>
                <Icon
                  className={styles.icon}
                  size={18}
                  color="#00004080"
                  icon="mail"
                />
              </a>
            </li>
            <li className={styles.hamburger}>
              <Icon
                className={styles.icon}
                size={24}
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

export default Navbar
