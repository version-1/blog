import React from 'react'
import { Link } from 'gatsby'
import Styles from 'lib/styles'
import Icon from 'components/atoms/Icon'
import { colors } from 'constants/index'

const PER_PAGE = 6

const styles = new Styles({
  container: `
    display: flex;
    margin: 32px auto;
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

  const link = (page: number) => {
    if (!page || page <= 0) return namespace + '/'
    if (page === 1) return namespace
    return `${namespace}/${page}`
  }
  return (
    <ul css={styles.container} className="pagination">
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
        <Link to={link(pageIndex + 1)}>
          <Icon icon="forwardFill" color={colors.fontColor} size={28} />
        </Link>
      </li>
    </ul>
  )
}

export default Pagination
