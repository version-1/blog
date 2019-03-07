import React from 'react';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';
import i18next from 'lib/i18next';
import Layout from 'components/layouts/Default';
import Post from 'components/Post';
import Pagination from 'components/Pagination';
import { tagPath } from 'lib/routes';

class TagTemplate extends React.PureComponent {
  render() {
    const {edges: posts, totalCount} = this.props.data.allMarkdownRemark;
    const {tag, index, layout} = this.props.pageContext;
    const {title} = this.props.data.site.siteMetadata;
    const heading = i18next.t(`tags.${tag}`);

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
              namespace={tagPath(tag)}
              count={totalCount}
            />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default TagTemplate;

export const tagPageQuery = graphql`
  query TagPage($tag: String, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: {fields: [frontmatter___createdAt], order: DESC}
      filter: {frontmatter: {tags: {in: [$tag]}}}
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
