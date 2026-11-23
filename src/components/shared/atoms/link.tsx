import React from 'react'
import { Link } from 'gatsby'

const LinkComponent = ({ children, to }: any) => {
  const path =
    typeof window === 'undefined' ? undefined : window.location.pathname
  if (!to && path === to) {
    return <a href={path}>{children}</a>
  }
  return <Link to={to}>{children}</Link>
}

export default React.memo(LinkComponent)
