import React from 'react';
import {Link} from 'gatsby';
import Img from '../components/atoms/Image';
import defaultImage from '../assets/images/default-image.jpg';
import { meta } from '../../config/constants';

const Post = ({amp, post}) => {
  const {title, date, thumbnail} = post.frontmatter;
  const thumbnailUrl = (meta.images.url + thumbnail) || defaultImage;
  return (
    <div className="col s12 m4" key={post.id}>
      <Link to={post.frontmatter.slug || post.fields.slug}>
        <div className="card hoverable">
          <div className="card-image">
            <Img amp={amp} src={thumbnailUrl} alt={title} />
          </div>
          <div className="card-content">
            <span>{post.frontmatter.title}</span>
            <small>{post.frontmatter.date}</small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
