import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { postPath } from 'lib/routes'
import Layout from 'components/layouts/Default'
import PostList from 'components/organisms/PostList'

const IndexPage = ({ data, path, pageContext }) => {
  const { nodes: posts, totalCount } = data.allMarkdownRemark
  // ピックアプのslugが空の場合にすべての記事を抽出してしまうので, this.props.pickupで分岐
  const pickup = pageContext.pickup ? data.pickup.nodes : []
  const context = useMemo(() => ({ ...pageContext, pickup, path }), [
    pageContext,
    path,
    pickup
  ])
  return (
    <Layout context={context}>
      <PostList
        titleLabel="labels.latest-posts"
        posts={posts}
        pagenationNamespace={postPath()}
        pagenationTotalCount={totalCount}
      />
    </Layout>
  )
}

export default IndexPage

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
}

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
