import React from 'react';
import {Link} from 'gatsby';
import Img from 'gatsby-image';
import defaultImage from '../assets/images/default-image.jpg';

const Post = ({post}) => {
  const {title, date, thumbnail} = post.frontmatter;
  if (!thumbnail.childImageSharp) {
    console.warn('thumbnail is not found', post.frontmatter);
  }
  return (
    <div className="col s12 m4" key={post.id}>
      <Link to={post.frontmatter.slug || post.fields.slug}>
        <div className="card hoverable">
          <div className="card-image">
            {thumbnail.childImageSharp ? (
              <Img fluid={thumbnail.childImageSharp.fluid} alt={title} />
            ) : (
              <img src={defaultImage} alt={title} />
            )}
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
