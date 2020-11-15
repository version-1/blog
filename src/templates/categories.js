import React, { useMemo } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import i18next from 'lib/i18next'
import Layout from 'components/layouts/Default'
import PostList from 'components/organisms/PostList'
import { PageContext } from 'context'
import { categoryPath } from 'lib/routes'

const CategoryTemplate = ({ data, path, pageContext }) => {
  const { title } = data.site.siteMetadata
  const { nodes: posts, totalCount } = data.allMarkdownRemark
  const { category, index } = pageContext
  const pickup = pageContext.pickup ? data.pickup.nodes : []
  const context = useMemo(() => ({ ...pageContext, pickup, path }), [
    pageContext,
    path,
    pickup,
  ])
  const pagenationNamespace = useMemo(
    () => categoryPath(pageContext.category),
    []
  )
  const label = `categories.${category}`
  const heading = i18next.t(label)

  return (
    <PageContext.Provider value={context}>
      <Layout>
        <Helmet title={`${heading}| ${title}`} />
        <PostList
          pageIndex={index}
          titleLabel={label}
          posts={posts}
          pagenationNamespace={pagenationNamespace}
          pagenationTotalCount={totalCount}
        />
      </Layout>
    </PageContext.Provider>
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
    pickup: allMarkdownRemark(
      filter: {
        frontmatter: { slug: { in: $pickup }, language: { eq: $language } }
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
            fixed(width: 190) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
