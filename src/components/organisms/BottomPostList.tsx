import React from 'react'
import { instance as i18next } from 'lib/i18next'
import HorizontalPostList from 'components/organisms/HorizontalPostList'

const BottomPostList = (props: any) => {
  const { posts, label, title } = props
  if (!posts || posts.length <= 0) {
    return <div />
  }

  const _title = title || i18next.t(label)
  return (
    <div className="bottom-posts">
      <h2 className="bottom-post-title">{_title}</h2>
      <HorizontalPostList posts={posts} />
    </div>
  )
}

export default React.memo(BottomPostList)
