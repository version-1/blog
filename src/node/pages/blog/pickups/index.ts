import { buildPaginationPages, genPath } from '../../../utils'
import { CreatePage } from '../../index.d'

export const createPickupIndexPage =
  (createPage: CreatePage) =>
  (basePath: string, slugs: string[]) =>
  (context: any) => {
    const _path = genPath(context.language, basePath)
    buildPaginationPages(createPage)()(_path, 'pickups', slugs.length, {
      ...context,
      slugs,
      basePath: _path,
      meta: {}
    })
  }
