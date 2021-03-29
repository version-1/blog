import React from 'react'
import Styles from 'lib/styles'
import Promotion from 'components/organisms/Promotion'
import Profile from 'components/organisms/Profile'
import { mq } from 'constants/index'

const styles = new Styles({
  container: `
    padding-left: 32px;
    color: inherit;
    ${mq.md} {
      padding: 8px;
    }
  `,
}).style

interface Props {
  language: Lang
  layout: LayoutContext
}

const Sidebar = ({ language }: Props) => {
  return (
    <div css={styles.container}>
      <Profile language={language}/>
      {language === 'ja' && <Promotion />}
    </div>
  )
}

export default Sidebar
