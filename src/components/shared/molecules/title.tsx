import React from 'react'
import Styles from 'lib/styles'
import { instance } from 'lib/i18next'

const styles = new Styles({
  container: `
    font-size: 14px;
    letter-spacing: 0.8px;
  `
}).style

const Title = (props: any) => {
  const title = props.title || instance.t(props.label)
  return <h3 className={Styles.join(styles.container, "title")}>{title}</h3>
}

export default React.memo(Title)
