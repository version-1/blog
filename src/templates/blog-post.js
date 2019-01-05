import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from '../components/atoms/Image';
import {graphql} from 'gatsby';
import {meta} from '../../config/constants';
import {ampify} from '../lib/ampify';
import Layout from '../components/layouts/Default';
import Content, {HTMLContent} from '../components/Content';
import { AdDoubleRect } from '../components/organisms/Adsence';
import SNSButtons from '../components/organisms/SNSButtons';
import i18next from '../lib/i18next';
import {categoryPath} from '../lib/routes';

const CategoryList = ({list}) => {
  return list.map((category, index) => {
    const name = i18next.t(`categories.${category}`);
    return (
      <a key={category} href={categoryPath(category)} className="category btn-flat">
        {name}
        {index === list.length - 1 ? '' : ',  '}
      </a>
    );
  });
};



export const BlogPostTemplate = ({post, contentComponent, helmet}) => {
  const content = post.html;
  const {createdAt, updatedAt, title, thumbnail, categories} = post.frontmatter;
  const PostContent = contentComponent || Content;
  const thumbnailUrl = meta.images.url + thumbnail;
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
          <SNSButtons type="post-header" url={window.location.href} title={title}/>
        </div>
        <PostContent className="post-body" content={content} />
        <AdDoubleRect/>
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
            <SNSButtons type="post-footer" url={window.location.href} title={title}/>
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
    const {amp, baseUrl} = this.props.pageContext;
    const {fluid} = post.frontmatter.thumbnail.childImageSharp || {};
    const content = fluid && [meta.siteUrl, fluid.src].join('');

    return (
      <Layout amp={amp} baseUrl={baseUrl}>
        <BlogPostTemplate
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
