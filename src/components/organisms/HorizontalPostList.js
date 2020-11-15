import React, { useEffect, useRef } from 'react'
import Image from 'components/atoms/Image'
import Title from 'components/molecules/Title'
import Post from 'components/organisms/posts/Default'
import { meta } from 'config/constants'

const PostList = props => {
  const { title, titleLabel, posts, defaultHorizontalSlide = 15 } = props
  const listRef = useRef()

  useEffect(() => {
    listRef.current.scrollTo({ top: 0, left: defaultHorizontalSlide, behavior: 'smooth' })
  }, [])

  if (!posts || posts.length <= 0) {
    return <></>
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
          <div ref={listRef} className="post-list">
            {posts.map((post, index) => {
              const thumbnailUrl = meta.images.url + post.frontmatter.thumbnail
              return (
                <Post
                  thumbnail={
                    <Image
                      gatsbyImage
                      gatsbyType="fixed"
                      fixed={post.thumbnail.childImageSharp.fixed}
                      src={thumbnailUrl}
                      alt={title}
                    />
                  }
                  post={post}
                  key={index}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PostList)
