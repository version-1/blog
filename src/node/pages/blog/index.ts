import moment from 'moment'
import path from 'path'
import { routes, constants } from '../../../configs/constants'
import { blog } from '../../../lib/routes'
import { withLog } from '../index'
import { fetch } from '../../utils/breadcrumbs'
import queries from '../../utils/queries'
import { Lang } from '../index.d'
import {
  PER_PAGE,
  STATIC_PAGE_LIST,
  genSlugMap,
  collectTags,
  collectCategories,
  createStaticPage,
  withContext
} from '../../utils'
import { createPostShowPage } from './posts/show'
import { createPostsIndexPage } from './posts'
import { createCategoryShowPage } from './categories/show'
import { createTagShowPage } from './tags'
import { createMonthArchivePage } from './months'
import { createPickupIndexPage } from './pickups'

/* CreatePages
 *
 *
 */

const mainQueries = [
  { language: 'ja', query: queries.jaIndexQuery },
  { language: 'en', query: queries.enIndexQuery }
]

export const createPages = async ({ actions, graphql }: any) => {
  let { createPage } = actions
  createPage = withLog(createPage)
  const allSlugs = await graphql(queries.slugListQuery)
  const slugMap = genSlugMap(allSlugs.data.allMarkdownRemark.nodes)

  return await Promise.all(
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

      let pickup: string[] = []
      if (language === 'ja') {
        pickup = constants.pickup.slice(0, 10)
        const _context = {
          pickup,
          ...context
        }
        createPage({
          path: blog.rootPath(language),
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
          path: blog.rootPath(language),
          component: path.resolve(`src/templates/index.tsx`),
          context
        })
      }
      // Show Pages
      await Promise.all(
        STATIC_PAGE_LIST.map(async (page) => {
          const result = await graphql(queries.staticPageQuery, {
            templateKey: page,
            language
          })
          const [post] = result.data.allMarkdownRemark.nodes
          createStaticPage(withContext(createPage))(post)(context)
        })
      )
      createPostShowPage(withContext(createPage))(posts, edges, [], slugMap)({
        pickupDisabled: true,
        pickup,
        ...context
      })

      createPickupIndexPage(createPage)('/' + routes.pickups, pickup)(context)
      createPickupIndexPage(createPage)('/' + routes.populars, [])(
        context
      )

      // Index Pages
      createMonthArchivePage(createPage)(context.layout.archiveByMonth)(context)
      createPostsIndexPage(createPage)(posts.length)(context)
      await Promise.all(
        categories.map(async (category: any) => {
          const result = await graphql(queries.categoryQuery, {
            category,
            language
          })
          const posts = result.data.allMarkdownRemark.nodes
          createCategoryShowPage(createPage)(category)(posts.length)(context)
        })
      )
      await Promise.all(
        tags.map(async (tag: any) => {
          const result = await graphql(queries.tagQuery, { tag, language })
          const posts = result.data.allMarkdownRemark.nodes
          createTagShowPage(createPage)(tag)(posts.length)(context)
        })
      )
      return
    })
  )
}

