import React from 'react';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';
import i18next from 'lib/i18next';
import Layout from 'components/layouts/Default';
import Post from 'components/Post';
import Pagination from 'components/Pagination';
import { categoryPath } from 'lib/routes';

class CategoryTemplate extends React.PureComponent {
  render() {
    const {edges: posts, totalCount} = this.props.data.allMarkdownRemark;
    const {category, index, layout} = this.props.pageContext;
    const {title} = this.props.data.site.siteMetadata;
    const heading = i18next.t(`categories.${category}`);

    return (
      <Layout layout={layout}>
        <Helmet title={`${heading}| ${title}`} />
        <section className="section">
          <div className="section-container">
            <div className="section-content">
              <div className="section-title">
                <div className="title-border" />
                <span className="title">{heading}</span>
              </div>
              <div className="section-list">
                <div className="row">
                  {posts.map(({node: post}) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div> </div>
            <Pagination
              index={index}
              namespace={categoryPath(category)}
              count={totalCount}
            />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default CategoryTemplate;

export const categryPageQuery = graphql`
  query CategoryPage($category: String, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: {fields: [frontmatter___createdAt], order: DESC}
      filter: {frontmatter: {categories: {in: [$category]}}}
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
