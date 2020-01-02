import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {postPath} from 'lib/routes';
import Layout from 'components/layouts/Default';
import Post from 'components/Post';
import Pagination from 'components/Pagination';
import i18next from 'lib/i18next';

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
        {this.popPosts.length > 0 && (
          <section className="section">
            <div className="section-container">
              <div className="section-content">
                <div className="section-title">
                  <span className="title">{i18next.t('labels.pop-posts')}</span>
                </div>
                <div className="section-list">
                  <div className="row">
                    {this.popPosts.map(({node: post}, index) => (
                      <Post post={post} key={index} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="section">
          <div className="section-container">
            <div className="section-content">
              <div className="section-title">
                <div className="title-border" />
                <span className="title">
                  {i18next.t('labels.latest-posts')}
                </span>
              </div>
              <div className="section-list">
                <div className="row">
                  {posts.map(({node: post}, index) => (
                    <Post post={post} key={index} />
                  ))}
                </div>
              </div>
              <Pagination namespace={postPath()} count={totalCount} />
            </div>
          </div>
        </section>
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
