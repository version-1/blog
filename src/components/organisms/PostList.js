import React from 'react';
import Title from 'components/molecules/Title';
import Post from 'components/organisms/posts/Default';
import Pagination from 'components/Pagination';

const PostList = props => {
  const {
    title,
    titleLabel,
    posts,
    pagenationNamespace,
    pagenationTotalCount,
    pageIndex,
  } = props;
  return (
    <div className="post-list-container">
      <div className="post-list">
        <div className="post-list-content">
          {title || titleLabel ? (
            <Title color="green" title={title} label={titleLabel} />
          ) : (
            <></>
          )}
          <div className="section-list">
            <div className="row">
              {posts.map((post, index) => (
                <Post post={post} key={index} />
              ))}
            </div>
          </div>
          {pagenationTotalCount && pagenationNamespace ? (
            <Pagination
              index={pageIndex}
              namespace={pagenationNamespace}
              count={pagenationTotalCount}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostList);
