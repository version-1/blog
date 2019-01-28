import AboutPost from './about';
import {graphql} from 'gatsby';
export const pageQuery = graphql`
  query AboutAMPPostByID($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      excerpt(truncate: true, pruneLength: 300)
      frontmatter {
        title
        thumbnail
        createdAt(formatString: "MMM DD, YYYY")
        updatedAt(formatString: "MMM DD, YYYY")
      }
    }
  }
`;
export default AboutPost;
