import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';
import {meta} from '../../config/constants';
import {ampify} from '../lib/ampify';
import Layout from '../components/layouts/Default';
import Content, {HTMLContent} from '../components/Content';

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {' '}
      {helmet || ''}{' '}
      <article className="post">
        <h1 className="post-title">{title}</h1>
        <PostContent className="post-body" content={content} />
      </article>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

export default class BlogPost extends React.PureComponent {
  render() {
    const {markdownRemark: post} = this.props.data;
    const description = post.excerpt;
    const {amp, baseUrl} = this.props.pageContext;
    const {fluid} = post.frontmatter.thumbnail.childImageSharp || {} ;
    const content = fluid && [meta.siteUrl, fluid.src].join('');

    return (
      <Layout amp={amp} baseUrl={baseUrl}>
        <BlogPostTemplate
          content={post.html}
          contentComponent={HTMLContent}
          helmet={
            <Helmet titleTemplate="%s | Blog">
              <title>{`${post.frontmatter.title}`}</title>
              <meta name="description" content={description} />
              <meta property="og:description" content={description} />
              <meta property="og:image" content={content} />
            </Helmet>
          }
          title={post.frontmatter.title}
        />
      </Layout>
    );
  }
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      excerpt(truncate: true, pruneLength: 300)
      frontmatter {
        title
        thumbnail
        createdAt(formatString: "MMMM DD, YYYY")
        updatedAt(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
