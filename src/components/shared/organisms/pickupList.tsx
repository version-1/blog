import React from 'react'
import HorizontalPostList from './horizontalPostList'

interface Props {
  posts: any[]
}

const PickupList = ({ posts }: Props) => {
  if (!posts || posts.length <= 0) {
    return <></>
  }

  return <HorizontalPostList posts={posts} label="labels.pickup" />
}

export default React.memo(PickupList)
