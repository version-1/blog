import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/Default'
import { postPath } from 'lib/routes'
import PostList from 'components/organisms/PostList'

const pagenationNamespace = postPath()

const PostsIndex = ({ data, path, pageContext }) => {
  const { index } = pageContext
  const { nodes: posts, totalCount } = data.allMarkdownRemark
  const context = useMemo(() => ({ ...pageContext, pickup: [], path }), [
    pageContext,
    path,
  ])
  return (
    <Layout context={context}>
      <PostList
        pageIndex={index}
        titleLabel="labels.articles"
        posts={posts}
        pagenationNamespace={pagenationNamespace}
        pagenationTotalCount={totalCount}
      />
    </Layout>
  )
}

export default PostsIndex

export const postsIndexQuery = graphql`
  query postsIndexQuery($language: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___createdAt], order: DESC }
      filter: {
        frontmatter: {
          templateKey: { eq: "blog-post" }
          language: { eq: $language }
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
