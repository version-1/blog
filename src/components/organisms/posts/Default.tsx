import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Category from 'components/atoms/Category'
import { meta } from 'config/constants'
import { instance as i18next } from 'lib/i18next'
import Styles from 'lib/styles'
import { tagPath, postShowPath } from 'lib/routes'
import { mq } from 'constants/index'

const styles = new Styles({
  container: `
    display: flex;
    border-radius: 8px;
    height: 184px;
    width: 494px;
    margin-bottom: 16px;
    background: linear-gradient(90deg, rgba(242, 242, 242, 0.54) 0%, rgba(255, 255, 255, 0.156) 100%);
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.01);
    ${mq.md} {
      width: 100%;
    }
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
      letter-spacing: 0.8px;
      margin-top: 4px;
      font-size: 14px;
    }

    p {
      font-weight: bold;
      font-size: 10px;
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
    border-radius: 8px 0px 0px 8px;
    width: 302px;
    ${mq.md} {
      width: 100%;
      border-radius: 8px;
    }
  `,
  right: `
    margin: auto;

    ${mq.md} {
      display: none;
    }

    img {
      border-radius: 8px;
    }
  `,
  footer: `
    padding: 16px;
  `,
  tags: `
    display: flex;
    align-items: baseline;
    color: #22222280;
    font-size: 12px;

    a {
      color: #22222280;
      font-style: italic;
      font-weight: normal;
      transition: all 0.3s linear;
    }

    a:hover {
      color: #222222;
    }

    li {
      margin-right: 4px;
    }
  `
}).style

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
            <Category category={category} language={language} />
            <h2>{title}</h2>
            <aside>{createdAt}</aside>
          </div>
          <div css={styles.footer}>
            <ul css={styles.tags}>
              {tags.slice(0, 3).map((item: string) => {
                return (
                  <li css={styles.tags} key={item}>
                    <Link to={tagPath(item, language)}>{`#${i18next.t(
                      `tags.${item}`
                    )}`}</Link>
                  </li>
                )
              })}
              {/* TODO impl tool tip */}
              {tags.length > 3 && <li> + {tags.length - 3}</li>}
            </ul>
          </div>
        </div>
        <div css={styles.right}>
          {image ? (
            <GatsbyImage image={image!} alt={title} />
          ) : (
            <img width={160} height={160} src={thumbnailUrl} alt={title} />
          )}
        </div>
      </div>
    </Link>
  )
}

export default Post
