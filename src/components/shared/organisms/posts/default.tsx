import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { meta } from 'configs/constants'
import { instance as i18next } from 'lib/i18next'
import Styles from 'lib/styles'
import { blog } from 'lib/routes'
import { mq } from 'constants/index'
import Category from '../../atoms/category'

const styles = new Styles({
  link: `
    ${mq.md} {
      width: 100%;
    }
  `,
  container: `
    display: flex;
    border-radius: 8px;
    width: 896px;
    margin-bottom: 16px;
    background: linear-gradient(90deg, rgba(242, 242, 242, 0.54) 0%, rgba(255, 255, 255, 0.156) 100%);
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.01);
    ${mq.md} {
      height: 240px;
      width: 100%;
    }
  `,
  header: `
    padding: 16px;
    background: linear-gradient(90deg, rgba(242, 242, 242, 0.54) 0%, rgba(255, 255, 255, 0.156) 100%);
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.01);
    border-radius: 8px 8px 0px 0px;
    height: 70%;
    position: relative;
    color: black;

    h2 {
      line-height: 1.4;
      letter-spacing: 0.8px;
      margin-top: 16px;
      font-size: 18px;
      ${mq.md} {
        font-size: 16px;
      }
    }

    p {
      font-weight: bold;
      font-size: 14px;
    }

    aside {
      color: background: #6F6F6F;
      font-size: 14px;
      position: absolute;
      bottom: 16px;
    }

    ${mq.md} {
      width: 100%;
    }
  `,
  left: `
    background: linear-gradient(90deg, rgba(242, 242, 242, 0.54) 0%, rgba(255, 255, 255, 0.156) 100%);
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.01);
    border-radius: 8px 0px 0px 8px;
    width: 550px;
    ${mq.md} {
      width: 100%;
      min-width: 100%;
      border-radius: 8px;
    }
  `,
  right: `
    margin: auto;

    ${mq.md} {
      display: none;
    }

    img {
      border-radius: 0px 8px 8px 0px;
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

const Post: React.VFC<any> = ({ post, containerStyle }) => {
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
  const thumbnailUrl = meta.images.url + (thumbnail || '')
  const image = getImage(post.thumbnail)
  const path = blog.postShowPath(slug, language)

  return (
    <Link className={styles.link} to={path}>
      <div className={[styles.container, containerStyle].join(' ')}>
        <div className={styles.left}>
          <div className={styles.header}>
            <Category category={category} language={language} />
            <h2>{title}</h2>
            <aside>{createdAt}</aside>
          </div>
          <div className={styles.footer}>
            <ul className={styles.tags}>
              {tags.slice(0, 3).map((item: string) => {
                return (
                  <li className={styles.tags} key={item}>
                    <Link to={blog.tagPath(item, language)}>{`#${i18next.t(
                      `tags.${item}`
                    )}`}</Link>
                  </li>
                )
              })}
              {tags.length > 3 && <li> + {tags.length - 3}</li>}
            </ul>
          </div>
        </div>
        <div className={styles.right}>
          {image ? (
            <GatsbyImage placeholder="none" image={image!} alt={title} />
          ) : (
            <img width={280} height={280} src={thumbnailUrl} alt={title} />
          )}
        </div>
      </div>
    </Link>
  )
}

export default Post
