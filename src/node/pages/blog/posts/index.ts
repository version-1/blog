import { buildPaginationPages, genPath } from '../../../utils'
import { CreatePage } from '../../index.d'
import { routes } from '../../../../configs/constants'

export const createPostsIndexPage = (createPage: CreatePage) => (
  totalCount: number
) => (context: any) => {
  const _path = ['', routes.post].join('/')
  buildPaginationPages(createPage)()(
    genPath(context.language, _path),
    'posts/index',
    totalCount,
    { ...context, meta: {} }
  )
}
