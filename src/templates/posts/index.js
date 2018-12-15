import React, {PureComponent} from 'react';
import {graphql} from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../../components/layouts/Default';
import Post from '../../components/Post';
import Pagination from '../../components/Pagination';
import { postPath } from '../../lib/routes';

export default class PostsIndex extends PureComponent {
  render() {
    const {index, totalPages} = this.props.pageContext;
    const { edges: posts, totalCount } = this.props.data.allMarkdownRemark;
    return (
      <Layout>
        <section className="section">
          <div className="section-container">
            <div className="section-content">
              <div className="section-title">
                <div className="title-border" />
                <span className="title">新着記事 { index } / { totalPages }</span>
              </div>
              <div className="section-list">
                <div className="row">
                  {posts.map(({node: post}) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
              </div>
            <Pagination
              index={index}
              namespace={postPath()}
              count={totalCount}
            />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export const postsIndexQuery = graphql`
  query postsIndexQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___createdAt], order: DESC}
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
            thumbnail
            slug
            thumbnail
            categories
          }
        }
      }
    }
  }
`;
