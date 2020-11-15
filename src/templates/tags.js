import React, { useMemo } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { PageContext } from 'context'
import i18next from 'lib/i18next'
import Layout from 'components/layouts/Default'
import PostList from 'components/organisms/PostList'
import { tagPath } from 'lib/routes'

const TagTemplate = ({ data, path, pageContext }) => {
  const { title } = data.site.siteMetadata
  const { nodes: posts, totalCount } = data.allMarkdownRemark
  const { pagenationNamespace } = tagPath(pageContext.tag)
  const { nodes: pickup } = data.pickup
  const { index, tag } = pageContext
  const context = useMemo(() => ({ ...pageContext, pickup, path }), [
    pageContext,
    path,
  ])
  const label = `tags.${tag}`
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

export default TagTemplate

export const tagPageQuery = graphql`
  query TagPage(
    $tag: String
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
        frontmatter: { tags: { in: [$tag] }, language: { eq: $language } }
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
