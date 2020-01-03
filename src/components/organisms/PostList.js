import React from 'react';
import Title from 'components/molecules/Title';
import Post from 'components/Post';
import Pagination from 'components/Pagination';

const PostList = props => {
  const {
    amp,
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
              {posts.map(({node: post}, index) => (
                <Post post={post} key={index} amp={amp} />
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
