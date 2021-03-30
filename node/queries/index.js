const POST_LIMIT = 10 // 1000
const frontmatter = `frontmatter {
            title
            language
            slug
            thumbnail
            canonical
            templateKey
            categories
            tags
            createdAt(formatString: "MMM DD, YYYY")
            updatedAt(formatString: "MMM DD, YYYY")
          }`

const slugListQuery = `
  {
    allMarkdownRemark(
      limit: ${POST_LIMIT},
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" },
        }
      }
    ) {
      nodes {
        id
        frontmatter {
          title
          slug
          language
        }
      }
    }
  }
`

const enIndexQuery = `
  {
    allMarkdownRemark(
      limit: ${POST_LIMIT},
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" },
          language: { eq: "en" }
        }
      }
    ) {
      edges {
        next {
          id
          ${frontmatter}
        }
        node {
          id
          fields {
            slug
          }
          excerpt(truncate: true, pruneLength: 300)
          ${frontmatter}
        }
        previous {
          id
          ${frontmatter}
        }
      }
      nodes {
        id
        fields {
          slug
        }
        excerpt(truncate: true, pruneLength: 300)
        ${frontmatter}
      }
    }
  }
`

const jaIndexQuery = `
  {
    allMarkdownRemark(
      limit: ${POST_LIMIT},
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" },
          language: { eq: "ja" }
        }
      }
    ) {
      edges {
        next {
          id
          ${frontmatter}
        }
        node {
          id
          fields {
            slug
          }
          excerpt(truncate: true, pruneLength: 300)
          ${frontmatter}
        }
        previous {
          id
          ${frontmatter}
        }
      }
      nodes {
        id
        fields {
          slug
        }
        excerpt(truncate: true, pruneLength: 300)
        ${frontmatter}
      }
    }
  }
`

const fetchBySlug = `query popularPostQuery($targets: [String]) {
    allMarkdownRemark(
      filter: {
        frontmatter: {slug: {in: $targets}}
      }
    ) {
      totalCount
      nodes {
        id
        fields {
          slug
        }
        excerpt(truncate: true, pruneLength: 300)
        ${frontmatter}
      }
    }
   }`

const staticPageQuery = `
 query StaticPageQuery($templateKey: String, $language: String) {
    allMarkdownRemark(
      limit: 1,
      filter: {
        frontmatter: {
          templateKey: { eq: $templateKey }
          language: { eq: $language }
        }
      }
    ) {
      nodes {
        id
        fields {
          slug
        }
        excerpt(truncate: true, pruneLength: 300)
        ${frontmatter}
      }
    }
  }
`

const categoryQuery = `
  query CategoryPage($category: String, $language: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {categories: {in: [$category]}, language: { eq: $language }}
      }
    ) {
      totalCount
      nodes {
        id
        excerpt(truncate: true, pruneLength: 300)
      }
    }
  }
`

const tagQuery = `
  query TagPage($tag: String, $language: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {tags: {in: [$tag]}, language: { eq: $language }}
      }
    ) {
      totalCount
      nodes {
        id
        excerpt(truncate: true, pruneLength: 300)
      }
    }
  }
`

module.exports = {
  fragments: {
    frontmatter
  },
  slugListQuery,
  jaIndexQuery,
  enIndexQuery,
  fetchBySlug,
  staticPageQuery,
  categoryQuery,
  tagQuery
}
