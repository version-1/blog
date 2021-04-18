import React from 'react'
import Styles from 'lib/styles'
import { instance as i18next } from 'lib/i18next'
import PostList from 'components/organisms/PostList'
import { mq } from 'constants/index'

const styles = new Styles({
  container: `
    h3 {
      text-align: center;
      margin-bottom: 32px;
    }

    .row {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    ${mq.md} {
      padding: 8px;
    }
  `,
  postContainerStyle: `
    margin: auto;
    margin-bottom: 16px;
  `
}).style

const BottomPostList = (props: any) => {
  const { posts, label, title } = props
  if (!posts || posts.length <= 0) {
    return <div />
  }

  const _title = title || i18next.t(label)
  return (
    <div css={styles.container} className="bottom-posts">
      <h3 className="bottom-post-title">{_title}</h3>
      <PostList rowStyle={styles.postContainerStyle} posts={posts} />
    </div>
  )
}

export default React.memo(BottomPostList)
