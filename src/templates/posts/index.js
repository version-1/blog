import React, {PureComponent} from 'react';
import {graphql} from 'gatsby';
import Layout from '../../components/layout';

export default class PostsIndex extends PureComponent {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    return (
      <Layout>
        {posts.map(({node}) => {
          const title = node.frontmatter.title || node.fields.slug;
          return <div key={node.fields.slug}>{title}</div>;
        })}
      </Layout>
    );
  }
}

export const postsIndexQuery = graphql`
  query postsIndexQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___createdAt], order: DESC}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            thumbnail
          }
        }
      }
    }
  }
`;
