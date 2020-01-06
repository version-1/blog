import React, {PureComponent} from 'react';
import {graphql} from 'gatsby';
import Layout from 'components/layouts/Default';
import PostList from 'components/organisms/PostList';

export default class MonthsIndex extends PureComponent {
  render() {
    const {
      index,
      month,
      totalPages,
      language,
      amp,
      baseUrl,
      layout,
    } = this.props.pageContext;
    const {nodes: posts, totalCount} = this.props.data.allMarkdownRemark;
    const {nodes: pickup} = this.props.data.pickup;
    const title = `記事一覧 ${index} / ${totalPages}`;

    return (
      <Layout
        amp={amp}
        baseUrl={baseUrl}
        pickup={pickup}
        language={language}
        layout={layout}>
        <PostList
          amp={amp}
          title={title}
          pageIndex={index}
          posts={posts}
          pagenationNamespace={month}
          pagenationTotalCount={totalCount}
        />
      </Layout>
    );
  }
}

export const monthsIndexQuery = graphql`
  query monthsIndexQuery(
    $ids: [String]
    $skip: Int!
    $pickup: [String]
    $limit: Int!
  ) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___createdAt], order: DESC}
      filter: {id: {in: $ids}}
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
    pickup: allMarkdownRemark(filter: {frontmatter: {slug: {in: $pickup}}}) {
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
