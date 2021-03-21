import React from 'react'
import Styles from 'lib/styles'
import Promotion from 'components/organisms/Promotion'
import Profile from 'components/organisms/Profile'

const styles = new Styles({
  container: `
    padding-left: 32px;
    color: inherit;
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
