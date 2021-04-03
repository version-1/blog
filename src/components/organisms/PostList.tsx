import React from 'react'
import Post from 'components/organisms/posts/Default'
import Pagination from 'components/Pagination'

interface Props {
  posts: Post[]
  pagination?: IPagination
}

const PostList: React.VFC<Props> = ({ posts, pagination = {} }: any) => {
  const { index, totalCount, namespace, per } = pagination
  return (
    <div className="post-list-container">
      <ul className="section-list">
        {posts.map((post: any) => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
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
  )
}

export default React.memo(PostList)
