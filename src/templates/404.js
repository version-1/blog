import React from 'react';
import Layout from 'components/layouts/Default.js';
import {graphql} from 'gatsby';
import PostList from 'components/organisms/PostList';

const NotFoundPage = props => {
  const {pickup, language, baseUrl, layout} = props.pageContext;
  const pickupList = pickup ? props.data.pickup.nodes : [];
  return (
    <Layout
      baseUrl={baseUrl}
      pickup={pickupList}
      language={language}
      layout={layout}>
      <div className="not-found">
        <h1>404 NOT FOUND</h1>
        <p>お探しのページが見つかりません。</p>
      </div>
      <PostList titleLabel="labels.pickup" posts={pickupList} />
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFoundPageQuery($language: String!, $pickup: [String]) {
    pickup: allMarkdownRemark(
      filter: {
        frontmatter: {
          templateKey: {eq: "blog-post"}
          language: {eq: $language}
          slug: {in: $pickup}
        }
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
            fluid(maxWidth: 796) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
