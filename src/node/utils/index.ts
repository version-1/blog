import compact from 'lodash/compact'
import uniq from 'lodash/uniq'
import get from 'lodash/get'
import flatten from 'lodash/flatten'
import kebabCase from 'lodash/kebabCase'
import path from 'path'
import { routes, meta, constants } from '../../configs/constants'
import { instance as i18next } from '../../lib/i18next'
import { Lang, CreatePage } from '../pages/index.d'
import { fetch } from './breadcrumbs'

// Constants
export const PER_PAGE = constants.per
export const STATIC_PAGE_LIST = constants.pages

export const genPath = (language: Lang, slug: string) => {
  if (language && language !== 'ja') {
    return ['/', language, '/', slug].join('').replace(/\/\//g, '/')
  }
  return slug
}

export const buildPaginationPages =
  (createPage: any) =>
  (limit: number = PER_PAGE) =>
  (
    namespace: string,
    templates: any,
    totalCounts: number,
    context: any = {}
  ) => {
    const totalPages = Math.ceil(totalCounts / limit)
    Array.from({ length: totalPages }).forEach(
      (_dummy: any, currentPageIndex: number) => {
        const _path =
          currentPageIndex === 0
            ? namespace
            : [namespace, currentPageIndex + 1].join('/')
        const titleSuffix = currentPageIndex
          ? `${currentPageIndex} / ${totalPages}`
          : ''
        const skip = currentPageIndex * limit
        const url = [meta.siteUrl, _path].join('')
        createPage({
          path: _path,
          component: path.resolve(`src/templates/${templates}.tsx`),
          context: {
            ...context,
            limit,
            skip,
            index: currentPageIndex + 1,
            totalPages,
            meta: {
              ...context.meta,
              title: context.meta.title
                ? `${context.meta.title} ${titleSuffix}`
                : '',
              url
            }
          }
        })
      }
    )
  }

export const genSlugMap = (posts: any) =>
  posts.reduce(
    (acc: any, item: any) => {
      const {
        frontmatter: { slug, language }
      } = item
      return {
        ...acc,
        [language]: { ...acc[language], [slug]: true }
      }
    },
    { ja: {}, en: {} }
  )

export const createCollectionShowPage =
  (createPage: CreatePage) =>
  (key: string, singuralizeKey: string, collection: any) =>
  (totalCount: number) =>
  (context: any) => {
    const _path = [
      '',
      routes[singuralizeKey as keyof typeof routes],
      kebabCase(collection)
    ].join('/')

    const breadcrumbs: any = fetch(context.language)
    const _breadcrumbs = [
      ...context.layout.breadcrumbs,
      breadcrumbs[key](collection, context.language)
    ]
    const heading = i18next.t(`${key}.${collection}`)
    const path = genPath(context.language, _path)
    const url = [meta.siteUrl, path].join('')
    buildPaginationPages(createPage)()(path, key, totalCount, {
      [singuralizeKey]: collection,
      ...context,
      layout: {
        ...context.layout,
        breadcrumbs: _breadcrumbs
      },
      meta: {
        title: heading,
        url
      },
      heading
    })
  }

const collectCollection = (posts: any) => (key: string) => {
  return uniq(
    compact(
      flatten(
        posts.map((post: any) => {
          if (get(post, `frontmatter.${key}`)) {
            return post.frontmatter[key]
          }
        })
      )
    )
  )
}

export const collectTags = (posts: any[]) => collectCollection(posts)('tags')
export const collectCategories = (posts: any[]) =>
  collectCollection(posts)('categories')

export const withContext = (createPage: CreatePage) => (params: any) => {
  const { context = {} } = params
  createPage({
    ...params,
    context: {
      ...context
    }
  })
}

export const createStaticPage =
  (createPage: CreatePage) => (page: any) => (context: any) => {
    const { id, excerpt } = page
    const { title, canonical, templateKey } = page.frontmatter
    const breadcrumbs: any = fetch(context.language)
    const _breadcrumbs = [
      ...context.layout.breadcrumbs,
      breadcrumbs[templateKey]
    ]
    const _path = genPath(context.language, templateKey)
    const url = [meta.siteUrl, _path].join('/')
    createPage({
      path: _path,
      component: path.resolve(`src/templates/${String(templateKey)}.tsx`),
      context: {
        id,
        ...context,
        layout: {
          ...context.layout,
          breadcrumbs: _breadcrumbs
        },
        meta: {
          title,
          description: excerpt,
          canonical,
          url
        }
      }
    })
  }
