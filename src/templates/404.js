import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/Default.js'
import PostList from 'components/organisms/PostList'

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
      <div className="not-found">
        <h1>404 NOT FOUND</h1>
        <p>お探しのページが見つかりません。</p>
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
            fluid(maxWidth: 796) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
