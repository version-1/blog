import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {postPath} from 'lib/routes';
import Layout from 'components/layouts/Default';
import PostList from 'components/organisms/PostList';

export default class IndexPage extends React.PureComponent {
  render() {
    const {data} = this.props;
    const {nodes: posts, totalCount} = data.allMarkdownRemark;
    // ピックアプのslugが空の場合にすべての記事を抽出してしまうので, this.props.pickupで分岐
    const {pickup, language, baseUrl, layout} = this.props.pageContext;
    const pickupList = pickup ? data.pickup.nodes: [];
    return (
      <Layout
        baseUrl={baseUrl}
        pickup={pickupList}
        language={language}
        layout={layout}>
        <PostList
          titleLabel="labels.latest-posts"
          posts={posts}
          pagenationNamespace={postPath()}
          pagenationTotalCount={totalCount}
        />
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const pageQuery = graphql`
  query IndexQuery($language: String!, $pickup: [String]) {
    pickup: allMarkdownRemark(filter: {
      frontmatter: {
        templateKey: {eq: "blog-post"},
        language: {eq: $language},
        slug: {in: $pickup},
        }
      }) {
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
            fixed(width: 190) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___createdAt]}
      filter: {
        frontmatter: {templateKey: {eq: "blog-post"}, language: {eq: $language}}
      }
      limit: 18
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
