import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { postShowPath } from 'lib/routes'
import { meta } from 'config/constants'
import Styles from 'lib/styles'

const styles = new Styles({
  container: `
    display: flex;
    border-radius: 8px;
    height: 184px;
    width: 494px;
    margin-bottom: 16px;
    background: linear-gradient(90deg, rgba(242, 242, 242, 0.54) 0%, rgba(255, 255, 255, 0.156) 100%);
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.01);
  `,
  header: `
    padding: 16px;
    background: linear-gradient(90deg, rgba(242, 242, 242, 0.54) 0%, rgba(255, 255, 255, 0.156) 100%);
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.01);
    border-radius: 8px 0px 0px 0px;
    height: 70%;
    position: relative;
    color: black;

    h2 {
      line-height: 1.2;
      font-size: 18px;
    }

    p {
      font-weight: bold;
      font-size: 10px;
    }

    .category,
    .category-column,
    .category-react {
      color: background: #6F6F6F;
      background: linear-gradient(90deg, #5A2AE4 0%, #FF0BC9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .category-engineering,
    .category-freelance {
      background: linear-gradient(90deg, #0066C5 0%, #9EFF71 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .category-design,
    .category-gadget
    {
      background: linear-gradient(90deg, #FF6832 0%, #D3A42B 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    aside {
      color: background: #6F6F6F;
      font-size: 10px;
      position: absolute;
      bottom: 16px;
    }
  `,
  left: `
    background: linear-gradient(90deg, rgba(242, 242, 242, 0.54) 0%, rgba(255, 255, 255, 0.156) 100%);
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.01);
    border-radius: 8px 8px 0px 0px;
    width: 302px;
  `,
  right: `
    margin: auto;
  `,
  footer: `
    padding: 16px;
  `
}).style

const c = (str: string) => {
  return str[0].toUpperCase() + str.slice(1, str.length)
}

const Post: React.VFC<any> = ({ post }) => {
  const {
    thumbnail,
    title,
    language,
    slug,
    tags,
    categories,
    createdAt
  } = post.frontmatter
  const [category] = categories
  const thumbnailUrl = meta.images.url + thumbnail
  const image = getImage(post.thumbnail)
  const path = postShowPath(slug, language)

  return (
    <Link to={path}>
      <div css={styles.container}>
        <div css={styles.left}>
          <div css={styles.header}>
            <p className={`category category-${category}`}>{c(category)}</p>
            <h2>{title}</h2>
            <aside>{createdAt}</aside>
          </div>
          <div css={styles.footer}>
            {tags.map((item: string) => {
              return <span key={item}>{`#${item}`}</span>
            })}
          </div>
        </div>
        <div css={styles.right}>
          {image ? (
            <GatsbyImage width={160} height={160} image={image!} alt={title} />
          ) : (
            <img width={160} height={160} src={thumbnailUrl} alt={title} />
          )}
        </div>
      </div>
    </Link>
  )
}

export default Post
