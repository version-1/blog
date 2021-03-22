import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Styles from 'lib/styles'
import { truncate } from 'lib/stringUtils'
import { postShowPath, categoryPath, aboutPath, tagPath } from 'lib/routes'
import Layout from 'components/layouts/Default'
import Icon from 'components/atoms/Icon'
import Bar from 'components/atoms/Bar'
import { HTMLContent } from 'components/Content'
import SNSButtons from 'components/organisms/SNSButtons'
import BottomPostList from 'components/organisms/BottomPostList'
import { instance as i18next } from 'lib/i18next'
import { colors } from 'constants/index'
import Promotion from 'components/organisms/Promotion'
import Profile from 'components/organisms/Profile'
import SearchCard from 'components/organisms/SearchCard'
import ArticleIndex from 'components/organisms/ArticleIndex'
import Breadcrumbs from 'components/molecules/Breadcrumbs'


const styles = new Styles({
  container: `
    max-width: 672px;
    padding: 32px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.56) 100%);
  `,
  content: `
    background: white;
    border-radius: 8px;
    padding: 32px 32px;
    margin-bottom: 64px;
  `,
  header: `
  `,
  timestamp: `
    font-size: 10px;
    color: #00000050;
  `,
  title: `
    font-size: 24px;
    margin-bottom: 16px;
  `,
  categories: `
    display: flex;
    margin-bottom: 8px;
    li {
      display: block;
      font-size: 10px;
      margin-right: 8px;
      color: 10px;
    }
  `,
  tags: `
    display: flex;
    margin-bottom: 8px;

    li {
      display: block;
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 16px;
      background: ${colors.primaryColor};
    }

    a {
      color: #ffffff80;
    }
  `,
  postFooter: `
    margin-bottom: 32px;
  `,
  share: `
    flex: 1;
    display: flex;
    algin-items: center;
    padding: 8px;
    padding-left: 0;

    p {
      display: flex;
    }

    li {
      margin-right: 4px;
    }
  `,
  shareLabel: `
    margin: auto 0;
    margin-right: 16px;
  `,
  profile: `
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 8px;
    padding-right: 0;
    margin-bottom: 16px;

    h4 {
      font-size: 14px;
      font-weight: bold;
    }

    p {
      width: 300px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .left {
      flex: 1;
    }

    .right {
      flex: 2;
    }

    .left,
    .right {
      padding: 4px;
    }
  `,
  paging: `
    display: flex;
    justify-content: space-between;
    font-size: 12px;

    .left,
    .right {
      flex: 1;
    }

    .left {
      padding-right: 8px;
    }
    .right {
      padding-left: 8px;
    }
    .left > a,
    .right > a {
      color: ${colors.primaryColor};
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    a > p {
      padding: 8px;
    }
  `,
  promotion: `
    width: 496px;
    margin: auto;
  `
}).style

interface HeaderProps {
  post: any
}

const Header: React.FC<HeaderProps> = ({ post }) => {
  const { createdAt, title, categories, language, tags } = post.frontmatter
  return (
    <div css={styles.header}>
      <div css={styles.timestamp}>{createdAt}</div>
      <h1 css={styles.title} className="post-title">
        {title}
      </h1>
      <div css={styles.meta}>
        <ul css={styles.categories}>
          {categories.map((item: string) => {
            return (
              <li>
                <Link to={categoryPath(item, language)}>
                  {i18next.t(`categories.${item}`)}
                </Link>
              </li>
            )
          })}
        </ul>
        <ul css={styles.tags}>
          {tags.map((item: string) => {
            return (
              <li>
                <Link to={tagPath(item, language)}>
                  {i18next.t(`tags.${item}`)}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

interface TemplateProps {
  location: Location
  post: any
  related: any
  layout: LayoutContext
}

const BlogPostTemplate: React.VFC<TemplateProps> = ({
  location,
  post,
  related,
  layout
}) => {
  const content = post.html
  const { title, language } = post.frontmatter
  const { next, previous } = layout
  const url = location.href

  return (
    <div css={styles.container}>
      <section className="section">
        <article css={styles.content} className="post">
          <Header post={post} />
          <Bar />
          <HTMLContent className="post-body" content={content} />
          <Bar />
          <div css={styles.postFooter} className="post-meta-footer">
            <div css={styles.share} className="sns-share-footer">
              <p>
                <label css={styles.shareLabel}>
                  {i18next.t('labels.share')}
                </label>
                <SNSButtons url={url} title={title} size={28} />
              </p>
            </div>
          </div>
          <div css={styles.paging}>
            <div className="left">
              {previous && (
                <Link to={postShowPath(previous!.frontmatter.slug, language)}>
                  <Icon icon="back" size={24} color={colors.primaryColor} />
                  <p>{truncate(previous!.frontmatter.title, 40)}</p>
                </Link>
              )}
            </div>
            <div className="right">
              {next && (
                <Link to={postShowPath(next!.frontmatter.slug, language)}>
                  <p>{truncate(next!.frontmatter.title, 40)}</p>
                  <Icon icon="forward" size={24} color={colors.primaryColor} />
                </Link>
              )}
            </div>
          </div>
        </article>
      </section>
      <BottomPostList label="labels.related-posts" posts={related} />
      <SearchCard />
      <div css={styles.promotion}>
        <Profile language={language} />
      </div>
      {language === 'ja' && (
        <div css={styles.promotion}>
          <Promotion />
        </div>
      )}
    </div>
  )
}

const BlogPost = ({ location, data, pageContext, path }) => {
  const { markdownRemark: post } = data
  const pickup = data.pickup.nodes
  const related = data.related.nodes
  const context = useMemo(
    () => ({ ...pageContext, sidebarDisabled: true, pickup, path }),
    [pageContext, path, pickup]
  )

  return (
    <Layout noconsole sidebar={<ArticleIndex {...post} />} context={context}>
      <Breadcrumbs context={pageContext.layout.breadcrumbs} />
      <BlogPostTemplate
        post={post}
        related={related}
        layout={context.layout}
        pickup={pickup}
        location={location}
      />
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID(
    $id: String!
    $language: String!
    $pickup: [String]
    $related: [String]
  ) {
    markdownRemark(id: { eq: $id }) {
      ...postFieldDetail
    }
    pickup: allMarkdownRemark(
      filter: {
        frontmatter: { language: { eq: $language }, slug: { in: $pickup } }
      }
    ) {
      totalCount
      nodes {
        ...postField
      }
    }
    related: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___createdAt] }
      filter: {
        frontmatter: { language: { eq: $language }, slug: { in: $related } }
      }
    ) {
      totalCount
      nodes {
        ...postField
      }
    }
  }
`
