import {
  createCollectionShowPage,
} from '../utils'
import { CreatePage } from '../index.d'

export const createCategoryShowPage = (createPage: CreatePage) => (
  category: string
) => (totalCount: number) => (context: any) => {
  return createCollectionShowPage(createPage)(
    'categories',
    'category',
    category
  )(totalCount)(context)
}

