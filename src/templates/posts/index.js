import React, {PureComponent} from 'react';
import {graphql} from 'gatsby';
import Layout from 'components/layouts/Default';
import {postPath} from 'lib/routes';
import PostList from 'components/organisms/PostList';

const pagenationNamespace = postPath()

export default class PostsIndex extends PureComponent {

  render() {
    const {index, amp, layout} = this.props.pageContext;
    const {edges: posts, totalCount} = this.props.data.allMarkdownRemark;
    return (
      <Layout layout={layout}>
        <PostList
          amp={amp}
          pageIndex={index}
          titleLabel="labels.articles"
          posts={posts}
          pagenationNamespace={pagenationNamespace}
          pagenationTotalCount={totalCount}
        />
      </Layout>
    );
  }
}

export const postsIndexQuery = graphql`
  query postsIndexQuery($language: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___createdAt], order: DESC}
      filter: {
        frontmatter: {templateKey: {eq: "blog-post"}, language: {eq: $language}}
      }
      limit: $limit
      skip: $skip
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
            categories
            createdAt(formatString: "MMM DD, YYYY")
            updatedAt(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }
`;
