import { createCollectionShowPage } from '../../../utils'
import { CreatePage } from '../../index.d'

export const createTagShowPage = (createPage: CreatePage) => (tag: string) => (
  totalCount: number
) => (context: any) => {
  return createCollectionShowPage(createPage)('tags', 'tag', tag)(totalCount)(
    context
  )
}
