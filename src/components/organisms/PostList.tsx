import React from 'react'
import Title from 'components/molecules/Title'
import Post from 'components/organisms/posts/Default'
import Pagination from 'components/Pagination'

const PostList = ({ posts, pagination = {} }: any) => {
  const {
    index,
    totalCount,
    namespace
  } = pagination
  return (
    <div className="post-list-container">
      <div className="post-list">
        <div className="post-list-content">
          <div className="section-list">
            <div className="row">
              {posts.map((post: any) => (
                <Post post={post} key={post.id} />
              ))}
            </div>
          </div>
          {totalCount && namespace ? (
            <Pagination
              index={index}
              namespace={namespace}
              count={totalCount}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(PostList)
