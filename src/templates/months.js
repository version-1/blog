import React, {PureComponent} from 'react';
import {graphql} from 'gatsby';
import Layout from 'components/layouts/Default';
import PostList from 'components/organisms/PostList';

export default class MonthsIndex extends PureComponent {
  render() {
    const context = this.props.pageContext;
    const {index, month, amp, totalPages} = context;
    const {edges: posts, totalCount} = this.props.data.allMarkdownRemark;
    const title = `記事一覧 ${index} / ${totalPages}`
    return (
      <Layout {...context}>
        <PostList
          amp={amp}
          title={title}
          pageIndex={index}
          posts={posts}
          pagenationNamespace={month}
          pagenationTotalCount={totalCount}
        />
      </Layout>
    );
  }
}

export const monthsIndexQuery = graphql`
  query monthsIndexQuery($ids: [String], $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___createdAt], order: DESC}
      filter: {id: {in: $ids}}
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
