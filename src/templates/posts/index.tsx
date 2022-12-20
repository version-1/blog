import React, { useMemo } from 'react'
import Styles from 'lib/styles'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/Default'
import { postPath } from 'lib/routes'
import PostList from 'components/organisms/PostList'
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

const PostsIndex: React.VFC<Props> = ({ data, path, pageContext }) => {
  const { index, limit } = pageContext
  const { nodes: posts, totalCount } = data.allMarkdownRemark
  const context = useMemo(
    () => ({ ...pageContext, pickup: [], path }),
    [pageContext, path]
  )

  const namespace = postPath(context.language)
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

export default PostsIndex

export const postsIndexQuery = graphql`
  query postsIndexQuery($language: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { createdAt: DESC } }
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
