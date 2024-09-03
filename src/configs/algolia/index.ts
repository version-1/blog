import i18next from 'i18next'
import enLocales from '../../services/blog/locales/en/index'
import jaLocales from '../../services/blog/locales/ja/index'
import { search } from '../constants'

i18next.init({
  fallbackLng: 'ja',
  resources: {
    en: {
      translation: enLocales.module
    },
    ja: {
      translation: jaLocales.module
    }
  }
})

const indexKey = process.env.CONTEXT === 'production' ? 'production' : 'development'
const indexName = search.index[indexKey]
const pageQuery = `{
  pages: allMarkdownRemark (
    filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
  ){
    edges {
      node {
        id
        excerpt(pruneLength: 30000)
        frontmatter {
            title
            language
            slug
            thumbnail
            canonical
            templateKey
            categories
            tags
            createdAt
            updatedAt
        }
      }
    }
  }
}`

console.log('INDEX_NAME', indexName)

function pageToAlgoliaRecord({ node: { id, excerpt, frontmatter, ...rest } }) {
  const { language, categories, tags } = frontmatter
  i18next.changeLanguage(language)

  const categoryLabels = (categories || []).map((item) => {
    return i18next.t(`categories.${item}`)
  })
  const tagLabels = (tags || []).map((item) => {
    return i18next.t(`tags.${item}`)
  })

  return {
    id,
    ObjectID: id,
    title: frontmatter.title,
    language,
    excerpt,
    frontmatter: {
      ...frontmatter,
      categoryLabels,
      tagLabels
    },
    ...rest
  }
}
export const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] }
  }
]
