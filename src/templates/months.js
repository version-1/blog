import React, { useMemo } from "react";
import { graphql } from "gatsby";
import Layout from "components/layouts/Default";
import { PageContext } from "context";
import PostList from "components/organisms/PostList";

const MonthsIndex = ({ path, data, pageContext }) => {
  const { index, month, totalPages } = pageContext;
  const { nodes: posts, totalCount } = data.allMarkdownRemark;
  const { nodes: pickup } = data.pickup;
  const context = useMemo(
    () => ({ ...pageContext, sidebarDisabled: true, pickup, path }),
    [pageContext, path, pickup]
  );
  const title = `記事一覧 ${index} / ${totalPages}`;

  return (
    <PageContext.Provider value={context}>
      <Layout>
        <PostList
          title={title}
          pageIndex={index}
          posts={posts}
          pagenationNamespace={month}
          pagenationTotalCount={totalCount}
        />
      </Layout>
    </PageContext.Provider>
  );
};

export default MonthsIndex;

export const monthsIndexQuery = graphql`
  query monthsIndexQuery(
    $ids: [String]
    $skip: Int!
    $pickup: [String]
    $limit: Int!
  ) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___createdAt], order: DESC }
      filter: { id: { in: $ids } }
      limit: $limit
      skip: $skip
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
    pickup: allMarkdownRemark(
      filter: { frontmatter: { slug: { in: $pickup } } }
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
            fixed(width: 190) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
