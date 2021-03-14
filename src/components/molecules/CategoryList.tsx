import React from 'react'
import { Link } from 'gatsby'
import { instance as i18next } from 'lib/i18next'
import { categoryPath } from 'lib/routes'

const CategoryList = ({ language, list }: any) => {
  return list.map((category: any, index: number) => {
    const name = i18next.t(`categories.${category}`)
    return (
      <Link
        key={category}
        to={categoryPath(category, language)}
        className="category btn-flat"
      >
        {name}
      </Link>
    )
  })
}

export default CategoryList
