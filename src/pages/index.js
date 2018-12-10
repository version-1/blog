import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import Pagination from '../components/Pagination';

export default class IndexPage extends React.PureComponent {
  render() {
    const {data} = this.props;
    const {edges: posts, totalCount} = data.allMarkdownRemark;
    // TODO: GAからとってこれるように
    const popPosts = posts.slice(0, 6);
    return (
      <Layout>
        <div className="row site-container">
          <div className="col m12 l8">
            <main className="main">
              <section className="section">
                <div className="section-container">
                  <div className="section-content">
                    <div className="section-title">
                      <span className="title">人気記事</span>
                    </div>
                    <div className="section-list">
                      <div className="row">
                        {popPosts.map(({node: post}) => (
                          <Post post={post} key={post.id} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="section">
                <div className="section-container">
                  <div className="section-content">
                    <div className="section-title">
                      <div className="title-border" />
                      <span className="title">新着記事</span>
                    </div>
                    <div className="section-list">
                      <div className="row">
                        {posts.map(({node: post}) => (
                          <Post post={post} key={post.id} />
                        ))}
                      </div>
                    </div>
                    <Pagination count={totalCount} />
                  </div>
                </div>
              </section>
            </main>
          </div>
          <div className="col l4 hide-on-med-and-down">
            <Sidebar posts={posts} />
          </div>
        </div>
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
  query IndexQuery {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___createdAt]}
      filter: {frontmatter: {templateKey: {eq: "blog-post"}}}
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
            slug
            thumbnail
            description
            templateKey
            createdAt(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
