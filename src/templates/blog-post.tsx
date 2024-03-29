import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Styles from 'lib/styles'
import { truncate } from 'lib/stringUtils'
import { postShowPath } from 'lib/routes'
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
import Header from 'components/organisms/ArticleHeader'
import { mq } from 'constants/index'
import 'prismjs/themes/prism-tomorrow.css'

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
    <div css={styles.container}>
      <section className="section">
        <article css={styles.content} className="post">
          <Header meta={meta} post={post} />
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
    <Layout
      noconsole
      sidebar={
        <div css={styles.index}>
          <ArticleIndex {...post} />
        </div>
      }
      context={context}
    >
      <div css={styles.breadcrumbs}>
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
