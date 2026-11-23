import path from 'path'
import { Lang, Edges, CreatePage } from '../../index.d'
import { genPath } from '../../../utils'
import { validateCategoryList } from '../../../utils/validation'
import { rating } from '../../../utils/related-post'
import { meta } from '../../../../configs/constants'
import { fetch } from '../../../utils/breadcrumbs'

const genShowPath = (edge: any) => {
  const { language, slug } = edge.frontmatter
  const _path = slug
  return genPath(language, _path)
}

const genAlternate = (paths: any[], orgLanguage: Lang, slug: string) => {
  return Object.keys(paths).reduce((acc: any, key: any) => {
    if (orgLanguage === key) {
      return acc
    }
    if (!paths[key as any][slug]) {
      return acc
    }

    return { ...acc, [key]: genPath(key, slug) }
  }, {})
}

export const createPostShowPage = (createPage: CreatePage) => (
  posts: any[],
  edges: Edges[],
  pageviews: any[],
  slugMap: any[]
) => (context: any) => {
  edges.forEach(({ next, node: edge, previous }: Edges) => {
    const { id, excerpt } = edge
    const {
      title,
      canonical,
      categories,
      slug,
      thumbnail,
      templateKey
    } = edge.frontmatter
    const breadcrumbs = fetch(context.language)
    const _breadcrumbs = [
      ...context.layout.breadcrumbs,
      breadcrumbs.categories(categories[0], context.language)
    ]
    validateCategoryList(edge, categories)
    const relatedRatings = rating(posts, edge, pageviews)

    const _path = genShowPath(edge)
    const baseUrl = [meta.siteUrl, slug].join('')
    const url = [meta.siteUrl, _path].join('')
    const alternate = genAlternate(slugMap, context.language, slug)
    const image = [meta.images.url, (thumbnail || '')].join('')

    createPage({
      path: _path,
      categories,
      component: path.resolve(`src/templates/${String(templateKey)}.tsx`),
      context: {
        id,
        ...context,
        related: relatedRatings
          .slice(0, 6)
          .map((r: { slug: string }) => r.slug),
        meta: {
          title,
          description: excerpt,
          url,
          canonical,
          alternate,
          image
        },
        layout: {
          ...context.layout,
          next,
          previous,
          baseUrl,
          breadcrumbs: _breadcrumbs
        }
      }
    })
  })
}
