const i18next = require('i18next')
const enLocales = require('../../src/locales/en')
const jaLocales = require('../../src/locales/ja')

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

const indexName = `my-blog-posts`
const pageQuery = `{
  pages: allMarkdownRemark {
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
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] }
  }
]
module.exports = queries