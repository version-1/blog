import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Category from 'components/atoms/Category'
import { meta } from 'config/constants'
import { instance as i18next } from 'lib/i18next'
import Styles from 'lib/styles'
import { tagPath, postShowPath } from 'lib/routes'

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
  `,
  right: `
    margin: auto;
  `,
  footer: `
    padding: 16px;
  `,
  tags: `
    display: flex;
    flex-wrap: wrap;

    a {
      color: #22222280;
      font-size: 12px;
      font-style: italic;
      font-weight: normal;
      transition: all 0.3s linear;
    }

    a:hover {
      color: #22222290;
      font-weight: bold;
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
              {tags.map((item: string) => {
                return (
                  <li css={styles.tags} key={item}>
                    <Link to={tagPath(item, language)}>{`#${i18next.t(
                      `tags.${item}`
                    )}`}</Link>
                  </li>
                )
              })}
            </ul>
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
