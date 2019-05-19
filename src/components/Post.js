import React from 'react';
import {Link} from 'gatsby';
import Img from 'components/atoms/Image';
import defaultImage from 'assets/images/default-image.jpg';
import {meta} from 'config/constants';
import i18next from 'lib/i18next';
import {categoryPath} from 'lib/routes';

const CategoryList = ({list = []}) => {
  return (list || []).map((category, index) => {
    const name = i18next.t(`categories.${category}`);
    return (
      <a key={category} href={categoryPath(category)} className="categories">
        {name}
        {index === list.length - 1 ? '' : ',  '}
      </a>
    );
  });
};

const path = post => {
  const _path = post.frontmatter.slug || post.fields.slug
  const { language } = post.frontmatter
  if (language !== 'ja') {
    return [language, _path].join('')
  }
  return _path
}

const Post = ({amp, post}) => {
  const {title, thumbnail} = post.frontmatter;
  const thumbnailUrl = meta.images.url + thumbnail || defaultImage;
  return (
    <div className="col s12 m4" key={post.id}>
      <div className="card hoverable">
        <div className="card-image">
          <Link to={path(post)}>
            <Img amp={amp} src={thumbnailUrl} alt={title} />
          </Link>
        </div>
        <div className="card-content">
          <div className="post-detail-header">
            <div className="created-at">
              <i className="tiny material-icons">create</i>
              <span className="timestamp">{post.frontmatter.createdAt}</span>
            </div>
            <div className="updated-at">
              <i className="tiny material-icons">autorenew</i>
              <span className="timestamp">{post.frontmatter.updatedAt}</span>
            </div>
            <div className="categories">
              <i className="tiny material-icons">list</i>
              <CategoryList list={post.frontmatter.categories} />
            </div>
          </div>
          <div className="post-title">
            <Link to={path(post)}>
              {post.frontmatter.title}
            </Link>
          </div>
          <div className="post-detail-footer">
            <div className="author">
              <i className="tiny material-icons">person</i>
              {meta.author}
            </div>
          </div>
          <div className="post-detail" />
        </div>
      </div>
    </div>
  );
};

export default Post;
