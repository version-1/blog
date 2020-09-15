import React from 'react';
import {Link} from 'gatsby';
import Image from 'components/atoms/Image';
import {postShowPath} from 'lib/routes';
import {meta} from 'config/constants';

const Post = ({thumbnail, post}) => {
  const {title, language, slug} = post.frontmatter;
  const thumbnailUrl = meta.images.url + post.frontmatter.thumbnail;
  const path = postShowPath(slug, language);
  const _title = title.length > 45 ? title.slice(0, 45) + '...' : title;
  return (
    <div className="card-container" key={post.id}>
      <div className="card">
        <div className="card-image">
          <Link to={path}>
            {thumbnail || (
              <Image
                gatsbyImage
                gatsbyType="fluid"
                fluid={post.thumbnail.childImageSharp.fluid}
                src={thumbnailUrl}
                alt={title}
              />
            )}
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
