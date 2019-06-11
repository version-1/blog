import React from 'react';
import {Link} from 'gatsby';
import Img from 'components/atoms/Image';
import defaultImage from 'assets/images/default-image.jpg';
import {meta} from 'config/constants';
import i18next from 'lib/i18next';
import {categoryPath, postShowPath} from 'lib/routes';

const CategoryList = ({language, list = []}) => {
  return (list || []).map((category, index) => {
    const name = i18next.t(`categories.${category}`);
    return (
      <Link
        to={categoryPath(category, language)}
        className="categories">
        {name}
        {index === list.length - 1 ? '' : ',  '}
      </Link>
    );
  });
};

const Post = ({amp, post}) => {
  const {categories, title, thumbnail, language, slug} = post.frontmatter;
  const thumbnailUrl = meta.images.url + thumbnail || defaultImage;
  const path = postShowPath(slug, language);
  return (
    <div className="col s12 m4" key={post.id}>
      <div className="card hoverable">
        <div className="card-image">
          <Link to={path}>
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
              <CategoryList language={language} list={categories} />
            </div>
          </div>
          <div className="post-title">
            <Link to={path}>{post.frontmatter.title}</Link>
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
