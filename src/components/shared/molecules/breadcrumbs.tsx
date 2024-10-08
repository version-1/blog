import React from 'react'
import { Link } from 'gatsby'
import Styles from 'lib/styles'
import Icon from 'components/shared/atoms/icon'

interface Props {
  context: Breadcrumb[]
}

const styles = new Styles({
  container: `
    display: flex;
    align-items: center;
    color: white;
    font-size: 16px;
    margin-bottom: 16px;

    li {
      margin: auto 0;
      margin-right: 16px;
    }

    p {
      margin: auto 0;
      position: relative;
      top: 2px;
    }

    a {
      color: white;
    }
  `
}).style

const Breadcrumbs: React.VFC<Props> = ({ context }) => {
  return (
    <ul className={Styles.join(styles.container, "breadcrumbs")}>
      {context.map((item: Breadcrumb, idx: number) => {
        return (
          <>
            <li className="breadcrumbs-item" key={idx}>
              <Link to={item.path}>{item.label}</Link>
            </li>
            <li>
              <p><Icon icon="forward" color="#fff" size={14} /></p>
            </li>
          </>
        )
      })}
    </ul>
  )
}

export default React.memo(Breadcrumbs)
