import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { meta } from 'config/constants'
import Layout from 'components/layouts/Default'
import Content, { HTMLContent } from 'components/Content'

const AboutTemplate = ({ post, contentComponent }) => {
  const content = post.html
  const { createdAt, updatedAt, title } = post.frontmatter
  const PostContent = contentComponent || Content
  return (
    <section className="section">
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
          <div className="author">
            Written By : <a href="#!">{meta.author}</a>
          </div>
        </div>
        <div className="related-posts" />
      </article>
    </section>
  )
}

const AboutPost = ({ data, pageContext, path }) => {
  const { markdownRemark: post } = data
  const context = useMemo(
    () => ({ ...pageContext, sidebarDisabled: true, path }),
    [pageContext, path]
  )

  return (
    <Layout context={context}>
      <AboutTemplate post={post} contentComponent={HTMLContent} />
    </Layout>
  )
}

export default AboutPost

export const pageQuery = graphql`
  query AboutPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      ...postFieldDetail
    }
  }
`
