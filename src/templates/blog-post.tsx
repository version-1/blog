import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Styles from 'lib/styles'
import { truncate } from 'lib/stringUtils'
import { blog } from 'lib/routes'
import Layout from 'components/layouts/default'
import Icon from 'components/shared/atoms/icon'
import Bar from 'components/shared/atoms/bar'
import { HTMLContent } from 'components/content'
import SNSButtons from 'components/shared/organisms/sns'
import BottomPostList from 'components/shared/organisms/bottomPostList'
import { instance as i18next } from 'lib/i18next'
import { mq, colors } from 'constants/index'
import Promotion from 'components/shared/organisms/promotion'
import Profile from 'components/shared/organisms/profile'
import SearchCard from 'components/shared/organisms/searchCard'
import ArticleIndex from 'components/shared/organisms/article'
import Header from 'components/shared/organisms/article/header'
import Breadcrumbs from 'components/shared/molecules/breadcrumbs'
import 'prism-themes/themes/prism-vsc-dark-plus.css'

const styles = new Styles({
  container: `
    max-width: 960px;
    min-width: 960px;
    padding: 32px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.56) 100%);

    ${mq.md} {
      padding: 0;
      width: 100%;
      min-width: 100%;
    }
  `,
  content: `
    background: white;
    border-radius: 8px;
    padding: 32px 32px;
    margin-bottom: 64px;
    ${mq.md} {
      padding: 16px;
      width: 100%:
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
  index: `
    ${mq.md} {
      display: none;
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
    ${mq.md} {
      width: 100%;
      margin: 0;
      padding: 8px;
    }
  `,
  breadcrumbs: `
    ${mq.md} {
      padding: 0 16px;
    }
  `
}).style

interface TemplateProps {
  location: Location
  post: any
  related: any
  layout: LayoutContext
  meta: any
}

const BlogPostTemplate: React.VFC<TemplateProps> = ({
  location,
  post,
  related,
  layout,
  meta
}) => {
  const content = post.html
  const { title, language } = post.frontmatter
  const { next, previous } = layout
  const url = location.href

  return (
    <div className={styles.container}>
      <section className="section">
        <article className={[styles.content, "post"].join(' ')}>
          <Header meta={meta} post={post} />
          <Bar />
          <HTMLContent className="post-body" content={content} />
          <Bar />
          <div className={[styles.postFooter, "post-meta-footer"].join(' ')}>
            <div className={[styles.share, "sns-share-footer"].join(' ')}>
              <p>
                <label className={styles.shareLabel}>
                  {i18next.t('labels.share')}
                </label>
                <SNSButtons url={url} title={title} size={28} />
              </p>
            </div>
          </div>
          <div className={styles.paging}>
            <div className="left">
              {previous && (
                <Link to={blog.postShowPath(previous!.frontmatter.slug, language)}>
                  <Icon icon="back" size={24} color={colors.primaryColor} />
                  <p>{truncate(previous!.frontmatter.title, 40)}</p>
                </Link>
              )}
            </div>
            <div className="right">
              {next && (
                <Link to={blog.postShowPath(next!.frontmatter.slug, language)}>
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
      <div className={styles.promotion}>
        <Profile language={language} />
      </div>
      {language === 'ja' && (
        <div className={styles.promotion}>
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
    <Layout
      noconsole
      sidebar={
        <div className={styles.index}>
          <ArticleIndex {...post} />
        </div>
      }
      context={context}
    >
      <div className={styles.breadcrumbs}>
        <Breadcrumbs context={pageContext.layout.breadcrumbs} />
      </div>
      <BlogPostTemplate
        {...context}
        post={post}
        related={related}
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
      sort: { frontmatter: { createdAt: DESC } }
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
