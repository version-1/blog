import React from 'react'
import { Link } from 'gatsby'
import { blog } from 'lib/routes'
import { instance as i18next } from 'lib/i18next'
import Styles from 'lib/styles'

const styles = new Styles({
  container: `
    display: inline-block;

    .category,
    .category-engineering,
    .category-react {
      display: inline-block;
      color: background: #6F6F6F;
      background: linear-gradient(90deg, #5A2AE4 0%, #FF0BC9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .category-column,
    .category-freelance {
      background: linear-gradient(90deg, #0066C5 0%, #9EFF71 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .category-design,
    .category-gadget
    {
      background: linear-gradient(90deg, #FF6832 0%, #D3A42B 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `
}).style

interface Props {
  style?: string
  category: string
  language: Lang
}

const Category: React.VFC<Props> = ({ style, category, language }) => {
  return (
    <p className={Styles.join(styles.container, style ? Styles.css(style) : '')}>
      <Link to={blog.categoryPath(category, language)}>
        <span className={`category category-${category}`}>
          {i18next.t(`categories.${category}`)}
        </span>
      </Link>
    </p>
  )
}

export default Category
