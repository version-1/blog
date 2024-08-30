import { createRemoteFileNode, createFilePath } from 'gatsby-source-filesystem'
import { meta } from '../../configs/constants'

const isProduction = process.env.NODE_ENV === 'production'
const dummyThumbnail = meta.images.url + '/others/dummy/thumbnail.png'

export const onCreateNode = async ({
  node,
  actions,
  cache,
  createNodeId,
  getNode
}: any) => {
  const { createNode, createNodeField } = actions
  if (
    node.internal.type === 'MarkdownRemark' &&
    node.frontmatter.thumbnail
  ) {
    const thumbnailUrl = isProduction
      ? meta.images.url + (node.frontmatter.thumbnail || '')
      : dummyThumbnail

    let fileNode = await createRemoteFileNode({
      url: thumbnailUrl, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache // Gatsby's cache,
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.thumbnail___NODE = fileNode.id
    }
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}
