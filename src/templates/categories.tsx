import React, { useMemo } from 'react'
import Styles from 'lib/styles'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/Default'
import PostList from 'components/organisms/PostList'
import { categoryPath } from 'lib/routes'
import { mq } from 'constants/index'

const styles = new Styles({
  postList: `
    margin-top: -128px;
    margin-left: 16px;

    ${mq.md} {
      margin-top: 0;
      margin: 0px 8px;
    }
  `
}).style

interface Props {
  data: any
  path: string
  pageContext: PageContext
}

const CategoryTemplate: React.VFC<Props> = ({ data, path, pageContext }) => {
  const { nodes: posts, totalCount } = data.allMarkdownRemark
  const { index, category, language, limit } = pageContext
  const pickup = pageContext.pickup ? data.pickup.nodes : []
  const context = useMemo(() => ({ ...pageContext, pickup, path }), [
    pageContext,
    path,
    pickup
  ])
  const namespace = useMemo(() => categoryPath(category!, language), [category])
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

export default CategoryTemplate

export const categryPageQuery = graphql`
  query CategoryPage(
    $category: String
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
        frontmatter: {
          categories: { in: [$category] }
          language: { eq: $language }
        }
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
