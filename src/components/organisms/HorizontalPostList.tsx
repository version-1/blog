import React, { useEffect, useRef } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Title from 'components/molecules/Title'
import Post from 'components/organisms/posts/Default'
import { meta } from 'config/constants'

const PostList = (props: any) => {
  const { title, titleLabel, posts, defaultHorizontalSlide = 15 } = props
  const listRef = useRef()

  useEffect(() => {
    listRef.current.scrollTo({
      top: 0,
      left: defaultHorizontalSlide,
      behavior: 'smooth'
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
            {posts.map((post: any, index: number) => {
              const thumbnailUrl = meta.images.url + post.frontmatter.thumbnail
              const image = getImage(post.thumbnail)
              return (
                <Post
                  thumbnail={
                    <img src={thumbnailUrl} alt={title} /> || (
                      <GatsbyImage image={image} alt={title} />
                    )
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
