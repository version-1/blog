import React from 'react';
import {Link} from 'gatsby';
import Img from 'components/atoms/Image';
import defaultImage from 'assets/images/default-image.jpg';
import {meta} from 'config/constants';
import {postShowPath} from 'lib/routes';

const Post = ({amp, post}) => {
  const {title, thumbnail, language, slug} = post.frontmatter;
  const thumbnailUrl = meta.images.url + thumbnail || defaultImage;
  const path = postShowPath(slug, language);
  const _title = title.length > 45 ? title.slice(0, 45) + '...' : title;
  return (
    <div className="card-container" key={post.id}>
      <div className="card">
        <div className="card-image">
          <Link to={path}>
            <Img amp={amp} src={thumbnailUrl} alt={title} />
          </Link>
        </div>
        <div className="card-content">
          <div className="post-detail-header">
            <div className="created-at">
              <i className="timestamp-icon tiny material-icons">create</i>
              <span className="timestamp">{post.frontmatter.createdAt}</span>
            </div>
            <div className="updated-at">
              <i className="timestamp-icon material-icons">autorenew</i>
              <span className="timestamp">{post.frontmatter.updatedAt}</span>
            </div>
          </div>
          <div className="post-title">
            <Link to={path}>{_title}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
