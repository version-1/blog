import React from 'react';
import Img from 'gatsby-image';
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
          {title || titleLabel ? (
            <Title color="green" title={title} label={titleLabel} />
          ) : (
            <></>
          )}
          <div className="post-list">
            {posts.map((post, index) => (
              <Post
                thumbnail={
                  <Img
                    fixed={post.thumbnail.childImageSharp.fixed}
                    alt={post.frontmatter.title}
                  />
                }
                post={post}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostList);
