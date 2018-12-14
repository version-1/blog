import React from 'react';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';
import i18next from '../lib/i18next';
import Layout from '../components/layouts/Default';
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';

class CategoryTemplate extends React.PureComponent {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const {category} = this.props.pageContext;
    const {title} = this.props.data.site.siteMetadata;
    const heading = i18next.t(`categories.${category}`);

    return (
      <Layout>
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default CategoryTemplate;

export const categryPageQuery = graphql`
  query CategoryPage($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: {fields: [frontmatter___createdAt], order: DESC}
      filter: {frontmatter: {categories: {in: [$category]}}}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            slug
            thumbnail
            categories
          }
        }
      }
    }
  }
`;
