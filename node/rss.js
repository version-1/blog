
const serialize = (params) => {
  const {query: {site, allMarkdownRemark}} = params
  return allMarkdownRemark.edges.map(edge => {
    const url =
      site.siteMetadata.siteUrl + edge.node.frontmatter.slug;
    const result = Object.assign({}, edge.node.frontmatter, {
      description: edge.node.excerpt,
      date: edge.node.frontmatter.createdAt,
      url,
      guid: url,
      custom_elements: [{'content:encoded': edge.node.html}],
    });
    return result
  });
}

const queries = language => {
  const array = '["' + language.join('","') + '" ]'
  return `{
    site {
      siteMetadata {
        title
        description
        siteUrl
        site_url: siteUrl
      }
    }
    allMarkdownRemark(
      limit: 1000,
      sort: { order: DESC, fields: [frontmatter___createdAt] },
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          language: { in: ${array} }
        }
      }
    ) {
      edges {
        node {
          excerpt
          html
          fields { slug }
          frontmatter {
            title
            slug
            createdAt(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }`
}


module.exports = {
  serialize,
  queries
}

