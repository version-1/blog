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
    const {nodes: posts, totalCount} = this.props.data.allMarkdownRemark;
    const {nodes: pickup} = this.props.data.pickup;
    const {
      index,
      category,
      language,
      amp,
      baseUrl,
      layout,
    } = this.props.pageContext;
    const {title} = this.props.data.site.siteMetadata;
    const label = `categories.${category}`;
    const heading = i18next.t(label)

    return (
      <Layout
        amp={amp}
        baseUrl={baseUrl}
        pickup={pickup}
        language={language}
        layout={layout}>
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
    $pickup: [String]
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
