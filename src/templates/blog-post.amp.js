import BlogPost from 'templates/blog-post';
import {graphql} from 'gatsby';

export const pageQuery = graphql`
  query BlogPostAMPByID($id: String!, $related: [String]) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      excerpt(truncate: true, pruneLength: 300)
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
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___createdAt]}
      filter: {frontmatter: {slug: {in: $related}}}
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
            language
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
  }
`;

export default BlogPost
