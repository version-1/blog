const slugListQuery = `
  {
    allMarkdownRemark(
      limit: 1000,
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
`;

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
      nodes {
        id
        fields {
          slug
        }
        excerpt(truncate: true, pruneLength: 300)
        frontmatter {
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
      nodes {
        id
        fields {
          slug
        }
        excerpt(truncate: true, pruneLength: 300)
        frontmatter {
          title
          language
          slug
          thumbnail
          templateKey
          canonical
          categories
          tags
          createdAt(formatString: "MMM DD, YYYY")
          updatedAt(formatString: "MMM DD, YYYY")
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
      nodes {
        id
        fields {
          slug
        }
        excerpt(truncate: true, pruneLength: 300)
        frontmatter {
          title
          canonical
          language
          slug
          thumbnail
          templateKey
          categories
          tags
          createdAt(formatString: "MMM DD, YYYY")
          updatedAt(formatString: "MMM DD, YYYY")
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
      nodes {
        id
        fields {
          slug
        }
        excerpt(truncate: true, pruneLength: 300)
        frontmatter {
          title
          language
          slug
          canonical
          thumbnail
          templateKey
          categories
          tags
          createdAt(formatString: "MMM DD, YYYY")
          updatedAt(formatString: "MMM DD, YYYY")
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
      nodes {
        id
        excerpt(truncate: true, pruneLength: 300)
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
      nodes {
        id
        excerpt(truncate: true, pruneLength: 300)
      }
    }
  }
`;


module.exports = {
  slugListQuery,
  jaIndexQuery,
  enIndexQuery,
  fetchBySlug,
  staticPageQuery,
  categoryQuery,
  tagQuery
}
