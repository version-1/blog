import React from 'react'
import { Link } from 'gatsby'

const LinkComponent = ({ children, ...rest }) => {
  const path =
    typeof window === 'undefined' ? undefined : window.location.pathname
  if (!rest.to && path === rest.to) {
    return <a href={path}>{children}</a>
  }
  return <Link {...rest}>{children}</Link>
}

export default React.memo(LinkComponent)
