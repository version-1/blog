import React from 'react';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';
import i18next from 'lib/i18next';
import Layout from 'components/layouts/Default';
import PostList from 'components/organisms/PostList';
import {tagPath} from 'lib/routes';

class TagTemplate extends React.PureComponent {
  get pagenationNamespace() {
    return tagPath(this.props.pageContext.tag);
  }

  render() {
    const {edges: posts, totalCount} = this.props.data.allMarkdownRemark;
    const context = this.props.pageContext;
    const {index, tag} = context;
    const {title} = this.props.data.site.siteMetadata;
    const label = `tags.${tag}`;
    const heading = i18next.t(label);

    return (
      <Layout {...context}>
        <Helmet title={`${heading}| ${title}`} />
        <PostList
          pageIndex={index}
          titleLabel={label}
          posts={posts}
          pagenationNamespace={this.pagenationNamespace}
          pagenationTotalCount={totalCount}
        />
      </Layout>
    );
  }
}

export default TagTemplate;

export const tagPageQuery = graphql`
  query TagPage($tag: String, $language: String, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: {fields: [frontmatter___createdAt], order: DESC}
      filter: {frontmatter: {tags: {in: [$tag]}, language: {eq: $language}}}
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            slug
            thumbnail
            categories
            tags
            createdAt(formatString: "MMM DD, YYYY")
            updatedAt(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }
`;
