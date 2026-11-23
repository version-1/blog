import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/default'
import { HTMLContent } from 'components/content'
import Styles from 'lib/styles'
import { instance as i18next } from 'lib/i18next'
import Bar from 'components/shared/atoms/bar'
import SNSButtons from 'components/shared/organisms/sns'
import Profile from 'components/shared/organisms/profile'
import SearchCard from 'components/shared/organisms/searchCard'
import ArticleIndex from 'components/shared/organisms/article'
import Header from 'components/shared/organisms/article/header'
import Promotion from 'components/shared/organisms/promotion'
import { mq, colors } from 'constants/index'

const styles = new Styles({
  container: `
    max-width: var(--content-width);
    padding: 32px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.56) 100%);

    ${mq.md} {
      padding: 8px;
      width: 100%:
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
  index: `
    ${mq.md} {
      display: none;
    }
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

    ${mq.md} {
      width: 100%;
      margin: 0;
      padding: 8px;
    }
  `
}).style

const AboutTemplate = ({ location, post, meta, language }: any) => {
  const content = post.html
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
                <SNSButtons url={url} size={28} />
              </p>
            </div>
          </div>
        </article>
      </section>
      <SearchCard />
      <div className={styles.promotion}>
        <Profile language={language} />
      </div>
      {language === 'ja' && (
        <div className={styles.promotion}>
          <Promotion language={language} />
        </div>
      )}
    </div>
  )
}

const AboutPost = ({ location, data, pageContext, path }: any) => {
  const { markdownRemark: post } = data
  const context = useMemo(
    () => ({ ...pageContext, sidebarDisabled: true, path }),
    [pageContext, path]
  )

  return (
    <Layout
      noconsole
      context={context}
      sidebar={
        <div className={styles.index}>
          <ArticleIndex {...post} />
        </div>
      }
    >
      <AboutTemplate {...context} post={post} location={location} />
    </Layout>
  )
}

export default AboutPost

export const pageQuery = graphql`
  query AboutPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      ...postFieldDetail
    }
  }
`
