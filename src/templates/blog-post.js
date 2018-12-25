import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';
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
    <section className="section"> {helmet || ''} <article className="post">
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

const BlogPost = ({data}) => {
  const {markdownRemark: post} = data;
  const description = post.excerpt;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={post.frontmatter.thumbnail} />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      excerpt(truncate: true, pruneLength: 300)
      frontmatter {
        title
        thumbnail {
          childImageSharp {
            fluid { ...GatsbyImageSharpFluid }
          }
        }
        createdAt(formatString: "MMMM DD, YYYY")
        updatedAt(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
