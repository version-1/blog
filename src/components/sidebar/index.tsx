import React from 'react'
import Styles from 'lib/styles'
import Promotion from '../shared/organisms/promotion'
import Profile from '../shared/organisms/profile'
import * as styles from './index.module.scss'

interface Props {
  language: Lang
  layout: LayoutContext
}

const Sidebar = ({ language }: Props) => {
  return (
    <div className={styles.container}>
      <Profile language={language}/>
      {language === 'ja' && <Promotion language={language} />}
    </div>
  )
}

export default Sidebar
