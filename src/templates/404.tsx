import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/Default'
import PostList from 'components/organisms/PostList'
import Styles from 'lib/styles'
import { instance as i18next } from 'lib/i18next'

const styles = new Styles({
  container: `
    padding: 32px;
    border-radius: 8px;
    margin-bottom: 32px;
    margin-top: -128px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%);
  `
}).style

const NotFoundPage = ({ data, path, pageContext }) => {
  const pickup = pageContext.pickup ? data.pickup.nodes : []
  const context = useMemo(
    () => ({
      ...pageContext,
      pickupDisabled: true,
      sidebarDisabled: true,
      pickup: pageContext.pickup,
      path
    }),
    [pageContext, path]
  )
  return (
    <Layout context={context}>
      <div css={styles.container} className="not-found">
        <h1>404 NOT FOUND</h1>
        <p>{i18next.t('labels.404')}</p>
      </div>
      <PostList titleLabel="labels.pickup" posts={pickup} />
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPageQuery($language: String!, $pickup: [String]) {
    pickup: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          language: { eq: $language }
          slug: { in: $pickup }
        }
      }
    ) {
      totalCount
      nodes {
        ...postField
      }
    }
  }
`
