import BlogPost from 'templates/blog-post';
import {graphql} from 'gatsby';

export const pageQuery = graphql`
  query BlogPostAMPByID($id: String!, $related: [String], $pickup: [String]) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      excerpt(truncate: true, pruneLength: 300)
      thumbnail {
        childImageSharp {
          fluid(maxWidth: 796) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      frontmatter {
        language
        title
        thumbnail
        categories
        tags
        createdAt(formatString: "MMM DD, YYYY")
        updatedAt(formatString: "MMM DD, YYYY")
      }
    }
    pickup: allMarkdownRemark(filter: {frontmatter: {slug: {in: $pickup}}}) {
      totalCount
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          language
          slug
          thumbnail
          templateKey
          categories
          tags
          createdAt(formatString: "MMM DD, YYYY")
          updatedAt(formatString: "MMM DD, YYYY")
        }
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 796) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    related: allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___createdAt]}
      filter: {frontmatter: {slug: {in: $related}}}
    ) {
      totalCount
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          language
          slug
          thumbnail
          templateKey
          categories
          tags
          createdAt(formatString: "MMM DD, YYYY")
          updatedAt(formatString: "MMM DD, YYYY")
        }
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 796) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default BlogPost
