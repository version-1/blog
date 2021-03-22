import React from 'react'
import Post from 'components/organisms/posts/Default'
import Pagination from 'components/Pagination'

interface Props {
  posts: Post[]
  pagination?: IPagination
}

const PostList: React.VFC<Props> = ({ posts, pagination = {} }: any) => {
  const {
    index,
    totalCount,
    namespace,
    per
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
              per={per}
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
