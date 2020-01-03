import React from 'react';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';
import i18next from 'lib/i18next';
import Layout from 'components/layouts/Default';
import PostList from 'components/organisms/PostList';
import {categoryPath} from 'lib/routes';

class CategoryTemplate extends React.PureComponent {
  get pagenationNamespace () {
    return categoryPath(this.props.pageContext.category)
  }

  render() {
    const {edges: posts, totalCount} = this.props.data.allMarkdownRemark;
    const context = this.props.pageContext;
    const {index, category} = context;
    const {title} = this.props.data.site.siteMetadata;
    const label = `categories.${category}`;
    const heading = i18next.t(label)

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

export default CategoryTemplate;

export const categryPageQuery = graphql`
  query CategoryPage(
    $category: String
    $language: String
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
      sort: {fields: [frontmatter___createdAt], order: DESC}
      filter: {
        frontmatter: {categories: {in: [$category]}, language: {eq: $language}}
      }
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
            createdAt(formatString: "MMM DD, YYYY")
            updatedAt(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }
`;
