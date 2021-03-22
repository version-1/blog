import React, { useMemo } from 'react'
import Styles from 'lib/styles'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/Default'
import PostList from 'components/organisms/PostList'
import { tagPath } from 'lib/routes'

const styles = new Styles({
  postList: `
    margin-top: -128px;
    margin-left: 16px;
  `
}).style

interface Props {
  data: any
  path: string
  pageContext: PageContext
}

const TagTemplate: React.VFC<Props> = ({ data, path, pageContext }) => {
  const { nodes: posts, totalCount } = data.allMarkdownRemark
  const namespace = tagPath(pageContext.tag!, pageContext.language)
  const { nodes: pickup } = data.pickup
  const { index, limit } = pageContext
  const context = useMemo(() => ({ ...pageContext, pickup, path }), [
    pageContext,
    path,
    pickup
  ])
  return (
    <Layout context={context}>
      <div css={styles.postList}>
        <PostList
          posts={posts}
          pagination={{
            index: Number(index),
            namespace,
            totalCount,
            per: limit!
          }}
        />
      </div>
    </Layout>
  )
}

export default TagTemplate

export const tagPageQuery = graphql`
  query TagPage(
    $tag: String
    $language: String
    $pickup: [String]
    $skip: Int!
    $limit: Int!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___createdAt], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] }, language: { eq: $language } }
      }
    ) {
      totalCount
      nodes {
        ...postField
      }
    }
    pickup: allMarkdownRemark(
      filter: {
        frontmatter: { slug: { in: $pickup }, language: { eq: $language } }
      }
    ) {
      totalCount
      nodes {
        ...postField
      }
    }
  }
`
