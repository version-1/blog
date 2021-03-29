import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/Default'
import { HTMLContent } from 'components/Content'
import Styles from 'lib/styles'
import { instance as i18next } from 'lib/i18next'
import { colors } from 'constants/index'
import Bar from 'components/atoms/Bar'
import SNSButtons from 'components/organisms/SNSButtons'
import Profile from 'components/organisms/Profile'
import SearchCard from 'components/organisms/SearchCard'
import ArticleIndex from 'components/organisms/ArticleIndex'
import Header from 'components/organisms/ArticleHeader'
import Promotion from 'components/organisms/Promotion'
import { mq } from 'constants/index'

const styles = new Styles({
  container: `
    max-width: 672px;
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
                <SNSButtons url={url} size={28} />
              </p>
            </div>
          </div>
        </article>
      </section>
      <SearchCard />
      <div css={styles.promotion}>
        <Profile language={language} />
      </div>
      {language === 'ja' && (
        <div css={styles.promotion}>
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
        <div css={styles.index}>
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
