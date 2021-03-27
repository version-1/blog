import React, { useMemo } from 'react'
import Styles from 'lib/styles'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/Default'
import PostList from 'components/organisms/PostList'

interface Props {
  data: any
  path: string
  pageContext: any
}

const styles = new Styles({
  postList: `
    margin-top: -128px;
    margin-left: 16px;
  `
}).style

const IndexPage: React.FC<Props> = ({ data, path, pageContext }) => {
  const { nodes: posts, totalCount } = data.allMarkdownRemark
  const context = useMemo(() => ({ ...pageContext, path }), [
    pageContext,
    path,
  ])
  const { limit, index } = pageContext
  return (
    <Layout context={context}>
      <div css={styles.postList}>
        <PostList
          posts={posts}
          pagination={{
            index,
            namespace: pageContext.basePath,
            totalCount,
            per: limit!
          }}
        />
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query PickupsIndexQuery(
    $language: String!,
    $slugs: [String],
    $limit: Int!
    $skip: Int!
    ) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          language: { eq: $language }
          slug: { in: $slugs }
        }
      }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      nodes {
        ...postField
      }
    }
  }
`
