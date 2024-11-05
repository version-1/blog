import { graphql } from 'gatsby'

export const postField = graphql`
  fragment indexFrontmatter on MarkdownRemarkFrontmatter {
    title
    language
    slug
    templateKey
    tags
    categories
    createdAt(formatString: "MMM DD, YYYY")
    updatedAt(formatString: "MMM DD, YYYY")
  }

  fragment postField on MarkdownRemark {
    id
    frontmatter {
      ...indexFrontmatter
    }
    excerpt(truncate: true, pruneLength: 200)
  }

  fragment postFieldDetail on MarkdownRemark {
    id
    html
    excerpt(truncate: true, pruneLength: 300)
    headings {
      depth
      id
      value
    }
    frontmatter {
      ...indexFrontmatter
    }
  }
`
