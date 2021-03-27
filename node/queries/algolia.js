const { fragments } = require('./index')
const indexName = `my-blog-posts`
const pageQuery = `{
  pages: allMarkdownRemark() {
    edges {
      node {
        id
        excerpt(pruneLength: 30000)
        fields {
          slug
        }
        ${fragments.frontmatter}
      }
    }
  }
}`
function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  }
}
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]
module.exports = queries
