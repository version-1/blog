import React from 'react';
import {useStaticQuery, Link} from 'gatsby';
import Img from 'gatsby-image';
import {postShowPath} from 'lib/routes';

const Post = ({amp, post}) => {
  const data = useStaticQuery(graphql`
    {
      defaultImage: file(relativePath: {eq: "default-image.jpg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  const defaultImage = data.defaultImage.childImageSharp.fluid;

  const {title, language, slug} = post.frontmatter;
  const {fluid = defaultImage} = post.thumbnail ? post.thumbnail.childImageSharp || {} : {};
  const path = postShowPath(slug, language);
  const _title = title.length > 45 ? title.slice(0, 45) + '...' : title;
  return (
    <div className="card-container" key={post.id}>
      <div className="card">
        <div className="card-image">
          <Link to={path}>
            <Img fluid={fluid} alt={title} />
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
