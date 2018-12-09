import React from 'react';
import {Link} from 'gatsby';

const Post = ({posts}) => {
  return (
    <>
      {posts.map(({node: post}) => (
        <div className="col s12 m6" key={post.id}>
          <Link to={post.fields.slug}>
            <div className="card hoverable">
              <div className="card-image">
                <img
                  src="https://materializecss.com/images/sample-1.jpg"
                  alt="alt text"
                />
              </div>
              <div className="card-content">
                <span className="card-title">{post.frontmatter.title}</span>
                <small>{post.frontmatter.date}</small>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Post;
