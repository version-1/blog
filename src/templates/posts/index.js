import React, {PureComponent} from 'react';
import {graphql} from 'gatsby';
import Layout from 'components/layouts/Default';
import Post from 'components/Post';
import Pagination from 'components/Pagination';
import { postPath } from 'lib/routes';
import i18next from 'lib/i18next';

export default class PostsIndex extends PureComponent {
  render() {
    const {index, amp, totalPages, layout} = this.props.pageContext;
    const { edges: posts, totalCount } = this.props.data.allMarkdownRemark;
    return (
      <Layout layout={layout}>
        <section className="section">
          <div className="section-container">
            <div className="section-content">
              <div className="section-title">
                <div className="title-border" />
                <span className="title">{i18next.t('labels.articles')} { index } / { totalPages }</span>
              </div>
              <div className="section-list">
                <div className="row">
                  {posts.map(({node: post}) => (
                    <Post key={post.id} post={post} amp={amp}/>
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
      filter: {frontmatter: {templateKey: {eq: "blog-post"}}}
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
