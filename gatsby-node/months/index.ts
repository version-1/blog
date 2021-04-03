import { buildPaginationPages, genPath } from '../utils'
import { CreatePage } from '../index.d'
import config from '../../config/constants'
import { fetch } from '../../node/breadcrumbs'
const { meta } = config

export const createMonthArchivePage = (createPage: CreatePage) => (
  archives: any
) => (context: any) => {
  Object.keys(archives).forEach((key) => {
    const _path = genPath(context.language, ['', key].join('/'))
    const totalCount = archives[key].length
    const breadcrumbs = fetch(context.language)
    const _breadcrumbs = [
      ...context.layout.breadcrumbs,
      breadcrumbs.monthArchive(key, context.language)
    ]
    const url = [meta.siteUrl, _path].join('')
    buildPaginationPages(createPage)()(_path, 'months', totalCount, {
      month: key,
      ids: archives[key],
      ...context,
      layout: {
        ...context.layout,
        breadcrumbs: _breadcrumbs
      },
      meta: {
        title: key,
        url
      }
    })
  })
}
