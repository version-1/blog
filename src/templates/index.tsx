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
  const { nodes: posts } = data.allMarkdownRemark
  // ピックアプのslugが空の場合にすべての記事を抽出してしまうので, this.props.pickupで分岐
  const pickup = pageContext.pickup ? data.pickup.nodes : []
  const context = useMemo(() => ({ ...pageContext, pickup, path }), [
    pageContext,
    path,
    pickup
  ])

  return (
    <Layout context={context}>
      <div css={styles.postList}>
        <PostList posts={posts} />
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery($language: String!, $pickup: [String]) {
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
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___createdAt] }
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          language: { eq: $language }
        }
      }
      limit: 9
    ) {
      totalCount
      nodes {
        ...postField
      }
    }
  }
`