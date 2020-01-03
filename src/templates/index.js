import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {postPath} from 'lib/routes';
import Layout from 'components/layouts/Default';
import PostList from 'components/organisms/PostList';

export default class IndexPage extends React.PureComponent {
  get popPosts() {
    if (!this.props.pageContext.popPosts) {
      return [];
    }
    const {
      edges: popPosts,
    } = this.props.pageContext.popPosts.data.allMarkdownRemark;
    return popPosts;
  }

  render() {
    const {data} = this.props;
    const context = this.props.pageContext;
    const {edges: posts, totalCount} = data.allMarkdownRemark;
    return (
      <Layout {...context}>
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
  query IndexQuery($language: String!) {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___createdAt]}
      filter: {
        frontmatter: {templateKey: {eq: "blog-post"}, language: {eq: $language}}
      }
      limit: 18
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
            language
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
  }
`;
