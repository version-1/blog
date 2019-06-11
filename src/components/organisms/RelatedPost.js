import React from 'react';
import {meta} from 'config/constants';
import {Link} from 'gatsby';
import i18next from 'lib/i18next';

const RelatedPost = edges => {
  if (!edges || !edges.related) {
    return <div />;
  }
  const {edges: posts} = edges.related;
  return (
    <div className="related-posts">
      <h2 className="related-post-title">{i18next.t('labels.related-posts')}</h2>
      <div className="row related-post-content">
        {posts.map(post => {
          const {slug, title, thumbnail} = post.node.frontmatter;
          const url = meta.images.url + thumbnail;
          return (
            <div key={slug} className="col s12 m4">
              <Link to={slug}>
                <div className="card related-post">
                  <div className="card-image related-img">
                    <img src={url} alt={title} />
                  </div>
                  <div className="card-content related-content">
                    <h3>{title}</h3>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPost;
