import React from 'react';
import Layout from '../components/layouts/Default.js';
import Post from '../components/Post';

const NotFoundPage = (props) => {
  const { layout } = props.pageContext;
  const {edges: posts} = props.pageContext.popPosts.data.allMarkdownRemark;
  return (
    <Layout layout={layout}>
      <div className="not-found">
        <h1>404 NOT FOUND</h1>
        <p>お探しのページが見つかりません。</p>
      </div>
      <section className="section">
        <div className="section-container">
          <div className="section-content">
            <div className="section-title">
              <span className="title">人気記事</span>
            </div>
            <div className="section-list">
              <div className="row">
                {posts.map(({node: post}) => (
                  <Post post={post} key={post.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
