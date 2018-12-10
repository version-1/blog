import React from 'react';
import {Link} from 'gatsby';

const Post = ({post}) => {
  const {title, date, thumbnail} = post.frontmatter;
  return (
    <div className="col s12 m4" key={post.id}>
      <Link to={post.frontmatter.slug || post.fields.slug}>
        <div className="card hoverable">
          <div className="card-image">
            <img src={thumbnail} alt={title} />
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
