import React from 'react'
import { Link } from 'gatsby'
import { instance as i18next } from 'lib/i18next'
import { tagPath } from 'lib/routes'

const TagList = ({ language, list }: any) => {
  return list.map((tag: string) => {
    const name = i18next.t(`tags.${tag}`)
    return (
      <Link key={tag} to={tagPath(tag, language)} className="tag btn-flat">
        {name}
      </Link>
    )
  })
}

export default TagList
