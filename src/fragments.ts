import { graphql } from 'gatsby'

export const postField = graphql`
  fragment indexFrontmatter on MarkdownRemarkFrontmatter {
      title
      language
      slug
      thumbnail
      templateKey
      tags
      categories
      createdAt(formatString: "MMM DD, YYYY")
      updatedAt(formatString: "MMM DD, YYYY")
  }

  fragment thumbnailData on File {
      childImageSharp {
        gatsbyImageData(
          width: 160
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
  }

  fragment postField on MarkdownRemark {
    id
    fields {
      slug
    }
    frontmatter {
      ...indexFrontmatter
    }
    thumbnail {
      ...thumbnailData
    }
  }

  fragment postFieldDetail on MarkdownRemark {
    id
    html
    excerpt(truncate: true, pruneLength: 300)
    fields {
      slug
    }
    frontmatter {
      ...indexFrontmatter
    }
    thumbnail {
      ...thumbnailData
    }
  }
`
