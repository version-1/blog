import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';
import {meta} from 'config/constants';
import Layout from 'components/layouts/Default';
import Content, {HTMLContent} from '../components/Content';


export const AboutTemplate = ({post, contentComponent, helmet}) => {
  const content = post.html;
  const {createdAt, updatedAt, title} = post.frontmatter;
  const PostContent = contentComponent || Content;
  return (
    <section className="section">
      {helmet || ''}{' '}
      <article className="post">
        <h1 className="post-title">{title}</h1>
        <div className="post-meta-header">
          <div className="timestamp">
            <div className="created-at">
              <i className="tiny material-icons">create</i>
              {createdAt}
            </div>
            <div className="updated-at">
              <i className="tiny material-icons">autorenew</i>
              {updatedAt}
            </div>
          </div>
        </div>
        <PostContent className="post-body" content={content} />
        <div className="post-meta-footer">
          <div className="author">
            Written By : <a href="#!">{meta.author}</a>
          </div>
        </div>
        <div className="related-posts" />
      </article>
    </section>
  );
};

AboutTemplate.propTypes = {
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

export default class AboutPost extends React.PureComponent {
  render() {
    const {markdownRemark: post} = this.props.data;
    const description = post.excerpt;
    const {amp, baseUrl, layout} = this.props.pageContext;
    const {fluid} = post.frontmatter.thumbnail.childImageSharp || {};
    const content = fluid && [meta.siteUrl, fluid.src].join('');

    return (
      <Layout amp={amp} baseUrl={baseUrl} layout={layout}>
        <AboutTemplate
          post={post}
          contentComponent={HTMLContent}
          helmet={
            <Helmet titleTemplate="%s | Blog">
              <title>{`${post.frontmatter.title}`}</title>
              <meta name="description" content={description} />
              <meta property="og:description" content={description} />
              <meta property="og:image" content={content} />
            </Helmet>
          }
        />
      </Layout>
    );
  }
}

AboutPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export const pageQuery = graphql`
  query AboutPostByID($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      excerpt(truncate: true, pruneLength: 300)
      frontmatter {
        title
        thumbnail
        createdAt(formatString: "MMM DD, YYYY")
        updatedAt(formatString: "MMM DD, YYYY")
      }
    }
  }
`;
