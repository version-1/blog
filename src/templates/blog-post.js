import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from '../components/atoms/Image';
import {graphql} from 'gatsby';
import {meta} from '../../config/constants';
import Layout from '../components/layouts/Default';
import Content, {HTMLContent} from '../components/Content';
import { AdDoubleRect } from '../components/organisms/Adsence';
import SNSButtons from '../components/organisms/SNSButtons';
import CategoryList from '../components/molecules/CategoryList';
import { insertInArticle } from '../lib/adsense'

export const BlogPostTemplate = ({post, contentComponent, helmet}) => {
  const content = insertInArticle(false)(post.html);
  const {createdAt, updatedAt, title, thumbnail, categories} = post.frontmatter;
  const PostContent = contentComponent || Content;
  const thumbnailUrl = meta.images.url + thumbnail;
  const url = typeof window !== 'undefined' && window.location.href
  return (
    <section className="section">
      {helmet || ''}{' '}
      <article className="post">
        <h1 className="post-title">{title}</h1>
        <div className="thumbnail">
          <Img src={thumbnailUrl} alt={title} />
        </div>
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
          <SNSButtons type="post-header" url={url} title={title}/>
        </div>
        <PostContent className="post-body" content={content} />
        <AdDoubleRect amp={false}/>
        <div className="post-meta-footer">
          <div className="categories">
            Category :
            <CategoryList list={categories} />
          </div>
          <div className="author">
            Written By : <a href="#">{meta.author}</a>
          </div>
          <div className="sns-share-footer">
            <p>この記事が役に立ちましたらシェアをお願いします。</p>
            <SNSButtons type="post-footer" url={url} title={title}/>
          </div>
        </div>
        <div className="related-posts" />
      </article>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

export default class BlogPost extends React.PureComponent {
  render() {
    const {markdownRemark: post} = this.props.data;
    const description = post.excerpt;
    const {baseUrl} = this.props.pageContext;
    const imageUrl = [meta.siteUrl, post.frontmatter.thumbnail].join('');

    return (
      <Layout baseUrl={baseUrl}>
        <BlogPostTemplate
          post={post}
          contentComponent={HTMLContent}
          helmet={
            <Helmet titleTemplate={`%s | ${meta.title}`}>
              <title>{`${post.frontmatter.title}`}</title>
              <meta name="description" content={description} />
              <meta property="og:description" content={description} />
              <meta property="og:image" content={imageUrl} />
            </Helmet>
          }
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
        categories
        createdAt(formatString: "MMM DD, YYYY")
        updatedAt(formatString: "MMM DD, YYYY")
      }
    }
  }
`;
