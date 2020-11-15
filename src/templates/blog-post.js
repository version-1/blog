import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { meta } from 'config/constants'
import { PageContext } from 'context'
import Layout from 'components/layouts/Default'
import Content, { HTMLContent } from 'components/Content'
import SNSButtons from 'components/organisms/SNSButtons'
import CategoryList from 'components/molecules/CategoryList'
import TagList from 'components/molecules/TagList'
import BottomPostList from 'components/organisms/BottomPostList'
import i18next from 'lib/i18next'

export const BlogPostTemplate = ({
  location,
  post,
  pickup,
  related,
  contentComponent,
  helmet,
}) => {
  const content = post.html
  const {
    createdAt,
    updatedAt,
    title,
    categories,
    language,
    tags,
  } = post.frontmatter
  const PostContent = contentComponent || Content
  const url = location.href

  return (
    <section className="section">
      {helmet || ''}
      <article className="post">
        <h1 className="post-title">{title}</h1>
        <div className="post-meta-header">
          <div className="timestamp">
            <div className="created-at">
              <i className="tiny material-icons">create</i>
              {createdAt}
            </div>
            <div className="updated-at">
              <i className="tiny material-icons">autorenew</i>
              {updatedAt}
            </div>
          </div>
        </div>
        <PostContent className="post-body" content={content} />
        <div className="post-meta-footer">
          <div className="categories">
            Category :
            <CategoryList language={language} list={categories} />
          </div>
          <div className="tags">
            Tag :
            <TagList language={language} list={tags} />
          </div>
          <div className="author">
            Written By : <a href="#!">{meta.author}</a>
          </div>
          <div className="sns-share-footer">
            <p>{i18next.t('labels.share')}</p>
            <SNSButtons type="post-footer" url={url} title={title} />
          </div>
        </div>
      </article>
      <BottomPostList label="labels.related-posts" posts={related} />
      <BottomPostList label="labels.pickup" posts={pickup} />
    </section>
  )
}

BlogPostTemplate.propTypes = {
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ location, data, pageContext, path }) => {
  const { markdownRemark: post } = data
  const description = post.excerpt
  const baseUrl = location.origin
  const imageUrl = [baseUrl, post.thumbnail.childImageSharp.fluid.src].join('')
  const pickup = data.pickup.nodes
  const related = data.related.nodes
  const context = useMemo(
    () => ({ ...pageContext, sidebarDisabled: true, pickup, path }),
    [pageContext, path, pickup]
  )

  return (
    <PageContext.Provider value={context}>
      <Layout>
        <BlogPostTemplate
          post={post}
          related={related}
          pickup={pickup}
          location={location}
          contentComponent={HTMLContent}
          helmet={
            <Helmet titleTemplate={`%s | ${meta.title}`}>
              <title>{`${post.frontmatter.title}`}</title>
              <meta name="description" content={description} />
              <meta property="og:title" content={post.frontmatter.title} />
              <meta property="og:url" content={location.href} />
              <meta property="og:description" content={description} />
              <meta property="og:image" content={imageUrl} />
            </Helmet>
          }
        />
      </Layout>
    </PageContext.Provider>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID(
    $id: String!
    $language: String!
    $pickup: [String]
    $related: [String]
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(truncate: true, pruneLength: 300)
      thumbnail {
        childImageSharp {
          fluid(maxWidth: 640) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      frontmatter {
        language
        title
        thumbnail
        categories
        tags
        createdAt(formatString: "MMM DD, YYYY")
        updatedAt(formatString: "MMM DD, YYYY")
      }
    }
    pickup: allMarkdownRemark(
      filter: {
        frontmatter: { language: { eq: $language }, slug: { in: $pickup } }
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
    related: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___createdAt] }
      filter: {
        frontmatter: { language: { eq: $language }, slug: { in: $related } }
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
