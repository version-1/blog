import React from 'react';
import i18next from 'lib/i18next';
import PostList from 'components/organisms/PostList';

const RelatedPost = edges => {
  if (!edges || !edges.related) {
    return <div />;
  }
  const {edges: posts} = edges.related;
  return (
    <div className="related-posts">
      <h2 className="related-post-title">
        {i18next.t('labels.related-posts')}
      </h2>
      <PostList posts={posts} />
    </div>
  );
};

export default RelatedPost;
