import React from 'react'
import { Link } from 'gatsby'
import Styles from 'lib/styles'
import Icon from 'components/atoms/Icon'
import { colors } from 'constants/index'
import { mq } from 'constants/index'

const PER_PAGE = 6

const styles = new Styles({
  container: `
     background: #CCCCCC30;
     border-radius: 32px;
     padding: 4px;
     ${mq.md} {
       margin-top: 16px;
       margin-bottom: 32px;
     }
  `,
  content: `
    display: flex;
    margin: 4px auto;
    width: 300px;
    justify-content: space-between;
    align-items: center;
  `,
  pageIndex: `
    display: flex;
    width: 100px;
    justify-content: space-between;

    span {
      display: block
      flex: 1;
    }
  `
}).style

interface Props {
  index: number
  namespace: string
  count: number
  per?: number
}

const Pagination: React.VFC<Props> = ({ index, namespace, count, per }) => {
  const perPage = per || PER_PAGE
  const pageCount = Math.ceil(count / perPage)
  const pageIndex = index || 1

  if (pageCount <= 1) {
    return null
  }

  const link = (page: number) => {
    if (!page || page <= 0) return namespace + '/'
    if (page === 1) return namespace
    return `${namespace}/${page}`
  }
  return (
    <div css={styles.container}>
      <ul css={styles.content} className="pagination">
        <li>
          {index > 1 && (
            <Link to={link(pageIndex - 1)}>
              <Icon icon="backFill" color={colors.fontColor} size={28} />
            </Link>
          )}
        </li>
        <li css={styles.pageIndex}>
          <span>{pageIndex}</span>
          <span>/</span>
          <span>{pageCount}</span>
        </li>
        <li>
          {pageIndex !== pageCount && (
            <Link to={link(pageIndex + 1)}>
              <Icon icon="forwardFill" color={colors.fontColor} size={28} />
            </Link>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Pagination
