import _ from 'lodash'
import moment from 'moment'
import { createRemoteFileNode, createFilePath } from 'gatsby-source-filesystem'
import path from 'path'
import config from '../config/constants'
import { rootPath } from '../src/lib/routes'
import { instance as i18next } from '../src/lib/i18next'
import { validateCategoryList } from '../node/validation'
import { fetch } from '../node/breadcrumbs'
import { fetchPv } from '../node/pageview'
import { rating } from '../node/related-post'
import queries from '../node/queries'
import { Lang, CreatePage } from '../gatsby-node/index.d'

const { routes, meta, constants } = config

const isProduction = process.env.NODE_ENV === 'production'
const dummyThumbnail = meta.images.url + '/others/dummy/thumbnail.png'

// Constants
const PER_PAGE = constants.per
const STATIC_PAGE_LIST = constants.pages

const genShowPath = (edge: any) => {
  const { language, slug } = edge.frontmatter
  const _path = slug || edge.fields.slug
  return genPath(language, _path)
}

const genPath = (language: Lang, slug: string) => {
  if (language && language !== 'ja') {
    return ['/', language, '/', slug].join('').replace(/\/\//g, '/')
  }
  return slug
}

const create = (createPage: CreatePage) => (params: any) => {
  const { context = {} } = params
  createPage({
    ...params,
    context: {
      ...context
    }
  })
}

const buildPaginationPages = (createPage: any) => (
  limit: number = PER_PAGE
) => (
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

const genSlugMap = (posts: any) =>
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

const createPostShowPage = (createPage: CreatePage) => (
  posts: any[],
  pageviews: any[],
  slugMap: any[]
) => (context: any) => {
  posts.forEach((edge) => {
    const { id, excerpt } = edge
    const {
      title,
      canonical,
      tags,
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
    validateCategoryList(edge, tags)
    const relatedRatings = rating(posts, edge, pageviews)
    const _path = genShowPath(edge)
    const baseUrl = [meta.siteUrl, slug].join('')
    const url = [meta.siteUrl, _path].join('')
    const alternate = genAlternate(slugMap, context.language, slug)
    const image = [meta.images.url, thumbnail].join('')
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
          baseUrl,
          breadcrumbs: _breadcrumbs
        }
      }
    })
  })
}

const createPostsIndexPage = (createPage: CreatePage) => (
  totalCount: number
) => (context: any) => {
  const _path = [routes.root, routes.post].join('/')
  buildPaginationPages(createPage)()(
    genPath(context.language, _path),
    'posts/index',
    totalCount,
    { ...context, meta: {} }
  )
}

const createCollectionShowPage = (createPage: CreatePage) => (
  key: string,
  singuralizeKey: string,
  collection: any
) => (totalCount: number) => (context: any) => {
  const _path = [
    '',
    routes[singuralizeKey as keyof typeof routes],
    _.kebabCase(collection)
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

const createCategoryShowPage = (createPage: CreatePage) => (
  category: string
) => (totalCount: number) => (context: any) => {
  return createCollectionShowPage(createPage)(
    'categories',
    'category',
    category
  )(totalCount)(context)
}

const createTagShowPage = (createPage: CreatePage) => (tag: string) => (
  totalCount: number
) => (context: any) => {
  return createCollectionShowPage(createPage)('tags', 'tag', tag)(totalCount)(
    context
  )
}

const createMonthArchivePage = (createPage: CreatePage) => (archives: any) => (
  context: any
) => {
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

const createStaticPage = (createPage: CreatePage) => (page: any) => (
  context: any
) => {
  const { id, excerpt } = page
  const { title, canonical, templateKey } = page.frontmatter
  const breadcrumbs: any = fetch(context.language)
  const _breadcrumbs = [...context.layout.breadcrumbs, breadcrumbs[templateKey]]
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

const collectCollection = (posts: any) => (key: string) => {
  return _.uniq(
    _.compact(
      _.flatten(
        posts.map((post: any) => {
          if (_.get(post, `frontmatter.${key}`)) {
            return post.frontmatter[key]
          }
        })
      )
    )
  )
}

const collectTags = (posts: any[]) => collectCollection(posts)('tags')
const collectCategories = (posts: any[]) =>
  collectCollection(posts)('categories')

/* CreatePages
 *
 *
 */

const mainQueries = [
  { language: 'ja', query: queries.jaIndexQuery },
  { language: 'en', query: queries.enIndexQuery }
]

export const createPages = async ({ actions, graphql }: any) => {
  const { createPage } = actions
  const allSlugs = await graphql(queries.slugListQuery)
  const slugMap = genSlugMap(allSlugs.data.allMarkdownRemark.nodes)

  return Promise.all(
    mainQueries.map(async (item: { language: Lang; query: string }) => {
      const { language, query } = item
      const result = await graphql(query)
      if (result.errors) {
        result.errors.forEach((e: Error) => console.error(e.toString()))
      }
      const posts = result.data.allMarkdownRemark.nodes
      const categories = collectCategories(posts)
      const tags = collectTags(posts).filter((tag: any) => tag !== 'dummy')
      const archiveByMonth = posts.reduce((acc: any, item: any) => {
        const key = moment(item.frontmatter.createdAt).format('YYYY/MM')
        return { ...acc, [key]: [...(acc[key] || []), item.id] }
      }, {})
      const breadcrumbs = fetch(language)
      const context = {
        language,
        limit: PER_PAGE,
        layout: {
          archiveByMonth,
          breadcrumbs: [breadcrumbs.top],
          categories,
          tags
        }
      }

      let rows = []
      let pickup = []
      if (language === 'ja') {
        const pv = await fetchPv()
        rows = pv.reports[0].data.rows
        const populars = rows.slice(0, 6).map((row: any) => row.dimensions[0])
        pickup = [...new Set([...constants.pickup, ...populars])].slice(0, 7)
        const _context = {
          pickup,
          ...context
        }
        createPage({
          path: '/',
          component: path.resolve(`src/templates/index.tsx`),
          context: _context
        })
        // Create 404 Page
        createPage({
          path: '/404.html',
          component: path.resolve(`src/templates/404.tsx`),
          context: _context
        })
      } else {
        createPage({
          path: rootPath(language),
          component: path.resolve(`src/templates/index.tsx`),
          context
        })
      }
      // Show Pages
      STATIC_PAGE_LIST.map((page) => {
        graphql(queries.staticPageQuery, { templateKey: page, language }).then(
          (result: any) => {
            const [post] = result.data.allMarkdownRemark.nodes
            createStaticPage(create(createPage))(post)(context)
          }
        )
      })
      createPostShowPage(create(createPage))(posts, rows, slugMap)({
        pickupDisabled: true,
        pickup,
        ...context
      })

      // Index Pages
      const _context = {
        pickup,
        ...context
      }
      createMonthArchivePage(createPage)(context.layout.archiveByMonth)(
        _context
      )
      createPostsIndexPage(createPage)(posts.length)(_context)
      categories.map((category: any) => {
        graphql(queries.categoryQuery, { category, language }).then(
          (result: any) => {
            const posts = result.data.allMarkdownRemark.nodes
            createCategoryShowPage(createPage)(category)(posts.length)(_context)
          }
        )
      })
      tags.map((tag: any) => {
        graphql(queries.tagQuery, { tag, language }).then((result: any) => {
          const posts = result.data.allMarkdownRemark.nodes
          createTagShowPage(createPage)(tag)(posts.length)(_context)
        })
      })
      return
    })
  )
}

export const onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
  getNode
}: any) => {
  const { createNode, createNodeField } = actions
  // fmImagesToRelative(node) // convert image paths for gatsby images
  //
  if (
    node.internal.type === 'MarkdownRemark' &&
    node.frontmatter.featuredImgUrl !== null
  ) {
    const thumbnailUrl = isProduction
      ? meta.images.url + node.frontmatter.thumbnail
      : dummyThumbnail

    let fileNode = await createRemoteFileNode({
      url: thumbnailUrl, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's Redux store
      reporter: {}
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.thumbnail___NODE = fileNode.id
    }
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}
