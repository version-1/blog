import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { blog } from 'lib/routes'
import { meta } from 'configs/constants'

const Horizontal = ({ post }: any) => {
  const { thumbnail, title, language, slug } = post.frontmatter
  const thumbnailUrl = meta.images.url + (thumbnail || '')
  const image = getImage(post.thumbnail)
  const path = blog.postShowPath(slug, language)
  const _title = title.length > 45 ? title.slice(0, 45) + '...' : title
  return (
    <div className="card-container" key={post.id}>
      <div className="card horizontal">
        <div className="card-image">
          <Link to={path}>
            {<img src={thumbnailUrl} alt={_title} /> || (
              <GatsbyImage image={image} alt={_title} />
            )}
          </Link>
        </div>
        <div className="card-content">
          <div className="post-detail-header">
            <div className="created-at">
              <i className="timestamp-icon tiny material-icons">create</i>
              <span className="timestamp">{post.frontmatter.createdAt}</span>
            </div>
            <div className="updated-at">
              <i className="timestamp-icon material-icons">autorenew</i>
              <span className="timestamp">{post.frontmatter.updatedAt}</span>
            </div>
          </div>
          <div className="post-title">
            <Link to={path}>{_title}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Horizontal
