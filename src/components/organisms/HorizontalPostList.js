import React from 'react';
import Title from 'components/molecules/Title';
import Post from 'components/Post';

const PostList = props => {
  const {title, titleLabel, posts} = props;
  if (!posts || posts.length <= 0) {
    return <></>;
  }
  return (
    <div className="horizontal-post-list-container">
      <div className="horizontal-post-list">
        <div className="horizontal-post-list-content">
          {title && titleLabel ? (
            <Title title={title} label={titleLabel} />
          ) : (
            <></>
          )}
          <div className="post-list">
            {posts.map(({node: post}, index) => (
              <Post post={post} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostList);
