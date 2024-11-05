import React, { useMemo } from 'react'
import Styles from 'lib/styles'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/default'
import PostList from 'components/shared/organisms/postList'
import { mq } from 'constants/index'
import { blog } from 'lib/routes'

interface Props {
  data: any
  path: string
  pageContext: any
}

const styles = new Styles({
  postList: `
    margin-top: -128px;
    margin-left: 16px;
    width: 896px;

    ${mq.md} {
      width: auto;
      margin-top: 0;
      margin: 0px 8px;
    }
  `
}).style

const IndexPage: React.FC<Props> = ({ data, path, pageContext }) => {
  const { nodes: posts, totalCount } = data.allMarkdownRemark
  // ピックアプのslugが空の場合にすべての記事を抽出してしまうので, this.props.pickupで分岐
  const pickup = pageContext.pickup ? data.pickup.nodes : []
  const context = useMemo(
    () => ({ ...pageContext, pickup, path }),
    [pageContext, path, pickup]
  )
  const { limit } = pageContext
  const namespace = blog.postPath(context.language)

  return (
    <Layout context={context}>
      <div className={styles.postList}>
        <PostList
          posts={posts}
          pagination={{
            index: 1,
            namespace,
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
      sort: { frontmatter: { createdAt: DESC } }
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
