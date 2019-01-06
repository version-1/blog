import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from '../components/atoms/Image';
import {graphql} from 'gatsby';
import {meta} from '../../config/constants';
import {ampify} from '../lib/ampify';
import {AdDoubleRect} from '../components/organisms/Adsence';
import Layout from '../components/layouts/Default';
import Content, {HTMLContent} from '../components/Content';
import CategoryList from '../components/molecules/CategoryList';
import SNSButtons from '../components/organisms/SNSButtons';
import {categoryPath} from '../lib/routes';

export const BlogPostTemplate = ({post, content, contentComponent, helmet}) => {
  const PostContent = contentComponent || Content;
  const {createdAt, updatedAt, title, thumbnail, categories} = post.frontmatter;
  const thumbnailUrl = meta.images.url + thumbnail;
  const url = typeof window !== 'undefined' && window.location.href
  return (
    <section className="section">
      {helmet || ''}
      <article className="post">
        <h1 className="post-title">{title}</h1>
        <div className="thumbnail">
          <Img amp src={thumbnailUrl} alt={title} />
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
          <SNSButtons
            type="post-header"
            url={url}
            title={title}
          />
        </div>
        <PostContent className="post-body" content={content} /> <AdDoubleRect />
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
            <SNSButtons
              type="post-footer"
              url={url}
              title={title}
            />
          </div>
        </div>
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
  constructor(props) {
    super(props)
    this.state = {
       html: null
    }
  }

  componentDidMount() {
    const {markdownRemark: post} = this.props.data;
    const {amp} = this.props.pageContext;
    const dom = new DOMParser().parseFromString(post.html, 'text/html')
    const html = ampify(dom).body.innerHTML;
    this.setState({ html })
  }

  render() {
    const {markdownRemark: post} = this.props.data;
    const description = post.excerpt;
    const {baseUrl} = this.props.pageContext;
    const content = [meta.siteUrl, post.frontmatter.thumbnail].join('');
    const { html } = this.state;

    return (
      <Layout amp baseUrl={baseUrl}>
        <BlogPostTemplate
          post={post}
          content={html}
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
          thumbnail={post.frontmatter.thumbnail}
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
  query BlogPostByAMPID($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      excerpt(truncate: true, pruneLength: 300)
      frontmatter {
        title
        thumbnail
        categories
        createdAt(formatString: "MMMM DD, YYYY")
        updatedAt(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
