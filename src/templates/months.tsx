import React, { useMemo } from 'react'
import Styles from 'lib/styles'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/Default'
import PostList from 'components/organisms/PostList'

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

const MonthsIndex: React.VFC<Props> = ({ path, data, pageContext }) => {
  const { index, month, limit } = pageContext
  const { nodes: posts, totalCount } = data.allMarkdownRemark
  const { nodes: pickup } = data.pickup
  const context = useMemo(
    () => ({ ...pageContext, sidebarDisabled: false, pickup, path }),
    [pageContext, path, pickup]
  )
  return (
    <Layout context={context}>
      <div css={styles.postList}>
        <PostList
          posts={posts}
          pagination={{
            index: Number(index),
            namespace: month!,
            totalCount,
            per: limit!
          }}
        />
      </div>
    </Layout>
  )
}

export default MonthsIndex

export const monthsIndexQuery = graphql`
  query monthsIndexQuery(
    $ids: [String]
    $skip: Int!
    $pickup: [String]
    $limit: Int!
  ) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___createdAt], order: DESC }
      filter: { id: { in: $ids } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      nodes {
        ...postField
      }
    }
    pickup: allMarkdownRemark(
      filter: { frontmatter: { slug: { in: $pickup } } }
    ) {
      totalCount
      nodes {
        ...postField
      }
    }
  }
`
