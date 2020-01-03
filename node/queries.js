const enIndexQuery = `
  {
    allMarkdownRemark(
      limit: 1000,
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" },
          language: { eq: "en" }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            slug
            language
            categories
            tags
            thumbnail
            templateKey
            createdAt
          }
        }
      }
    }
  }
`;

const jaIndexQuery = `
  {
    allMarkdownRemark(
      limit: 1000,
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" },
          language: { eq: "ja" }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            slug
            language
            categories
            tags
            thumbnail
            templateKey
            createdAt
          }
        }
      }
    }
  }
`;

const fetchBySlug = `query popularPostQuery($targets: [String]) {
allMarkdownRemark(
      filter: {
        frontmatter: {slug: {in: $targets}}
      }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            slug
            thumbnail
            templateKey
            categories
            createdAt(formatString: "MMM DD, YYYY")
            updatedAt(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
   }`;

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
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            templateKey
          }
        }
      }
    }
  }
`;

const categoryQuery = `
  query CategoryPage($category: String, $language: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {categories: {in: [$category]}, language: { eq: $language }}
      }
    ) {
      totalCount
      edges {
        node {
          id
        }
      }
    }
  }
`;

const tagQuery = `
  query TagPage($tag: String, $language: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {
        frontmatter: {tags: {in: [$tag]}, language: { eq: $language }}
      }
    ) {
      totalCount
      edges {
        node {
          id
        }
      }
    }
  }
`;


module.exports = {
  jaIndexQuery,
  enIndexQuery,
  fetchBySlug,
  staticPageQuery,
  categoryQuery,
  tagQuery
}
