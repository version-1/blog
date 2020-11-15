import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/Default'
import { postPath } from 'lib/routes'
import { PageContext } from 'context'
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
    <PageContext.Provider value={context}>
      <Layout>
        <PostList
          pageIndex={index}
          titleLabel="labels.articles"
          posts={posts}
          pagenationNamespace={pagenationNamespace}
          pagenationTotalCount={totalCount}
        />
      </Layout>
    </PageContext.Provider>
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
        id
        fields {
          slug
        }
        frontmatter {
          title
          language
          slug
          thumbnail
          templateKey
          categories
          tags
          createdAt(formatString: "MMM DD, YYYY")
          updatedAt(formatString: "MMM DD, YYYY")
        }
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 640) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
