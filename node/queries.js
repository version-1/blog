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

const popularPostQuery = `query popularPostQuery($populars: [String]) {
allMarkdownRemark(
      filter: {
        frontmatter: {slug: {in: $populars}}
      }
      limit: 6
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
 query StaticPageQuery($templateKey: String) {
    allMarkdownRemark(
      limit: 1,
      filter: {
        frontmatter: { templateKey: { eq: $templateKey }}
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
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {frontmatter: {categories: {in: [$category]}}}
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
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      filter: {frontmatter: {tags: {in: [$tag]}}}
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
  popularPostQuery,
  staticPageQuery,
  categoryQuery,
  tagQuery
}
