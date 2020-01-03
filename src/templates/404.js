import React from 'react';
import Layout from 'components/layouts/Default.js';
import PostList from 'components/organisms/PostList';

const NotFoundPage = props => {
  const context = props.pageContext;
  const posts = context.pickup ? context.pickup.data.allMarkdownRemark.edges : [];
  return (
    <Layout {...context}>
      <div className="not-found">
        <h1>404 NOT FOUND</h1>
        <p>お探しのページが見つかりません。</p>
      </div>
      <PostList titleLabel="labels.pickup" posts={posts} />
    </Layout>
  );
};

export default NotFoundPage;
