import difference from 'lodash/difference'
import { constants } from '../../configs/constants'

const CATEGORY_LIST = constants.categories

export const validateCategoryList = (node, categories) => {
  const diff = difference(categories, CATEGORY_LIST)
  if (diff.length > 0) {
    console.error('category not found', diff, node.frontmatter.slug)
  }
}

