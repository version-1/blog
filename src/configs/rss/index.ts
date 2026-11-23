export const serialize = params => {
  const {
    query: { site, allMarkdownRemark }
  } = params;
  return allMarkdownRemark.edges.map(edge => {
    const { language, thumbnail } = edge.node.frontmatter;
    const {
      siteMetadata: { siteUrl, imageBaseUrl }
    } = site;
    const url =
      language === "ja"
        ? siteUrl + edge.node.frontmatter.slug
        : [siteUrl, "/" + language + edge.node.frontmatter.slug].join("");
    const result = Object.assign({}, edge.node.frontmatter, {
      description: edge.node.excerpt,
      date: edge.node.frontmatter.createdAt,
      url,
      guid: url,
      custom_elements: [
        { "content:encoded": edge.node.html },
        { thumbnailUrl: imageBaseUrl + thumbnail },
        { language }
      ]
    });
    return result;
  });
};

export const blogQueries = (language: string[], limit = 10) => {
  const array = '["' + language.join('","') + '" ]';
  return `{
    site {
      siteMetadata {
        title
        description
        siteUrl
        site_url: siteUrl
        imageBaseUrl
      }
    }
    allMarkdownRemark(
      limit: ${limit},
      sort: { frontmatter: { createdAt: DESC } },
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
          frontmatter {
            title
            language
            slug
            thumbnail
            createdAt(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }`;
};

export const labQueries = (limit = 10) => {
  return `{
    site {
      siteMetadata {
        title
        description
        siteUrl
        site_url: siteUrl
        imageBaseUrl
      }
    }
    allMarkdownRemark(
      limit: 1000,
      sort: { frontmatter: { createdAt: DESC } },
      filter: {
        fileAbsolutePath: {regex: "/src\\/contents\\/lab\\/posts\\/(?!private)/"}
      }
    ) {
      edges {
        node {
          excerpt
          html
          frontmatter {
            title
            slug
            date(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }`
};



