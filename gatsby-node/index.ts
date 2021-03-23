import _ from 'lodash'
import moment from 'moment'
import { createRemoteFileNode, createFilePath } from 'gatsby-source-filesystem'
import path from 'path'
import config from '../config/constants'
import { rootPath } from '../src/lib/routes'
import { fetch } from '../node/breadcrumbs'
import { fetchPv } from '../node/pageview'
import queries from '../node/queries'
import { Lang, CreatePage } from '../gatsby-node/index.d'
import {
  PER_PAGE,
  STATIC_PAGE_LIST,
  genPath,
  genSlugMap,
  collectTags,
  collectCategories
} from '../gatsby-node/utils'
import { createPostShowPage } from '../gatsby-node/posts/show'
import { createPostsIndexPage } from '../gatsby-node/posts'
import { createCategoryShowPage } from '../gatsby-node/categories/show'
import { createTagShowPage } from '../gatsby-node/tags'
import { createMonthArchivePage } from '../gatsby-node/months'

const { meta, constants } = config

const isProduction = process.env.NODE_ENV === 'production'
const dummyThumbnail = meta.images.url + '/others/dummy/thumbnail.png'

const create = (createPage: CreatePage) => (params: any) => {
  const { context = {} } = params
  createPage({
    ...params,
    context: {
      ...context
    }
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
      const edges = result.data.allMarkdownRemark.edges
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
      createPostShowPage(create(createPage))(posts, edges, rows, slugMap)({
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
