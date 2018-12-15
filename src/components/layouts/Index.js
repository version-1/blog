import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import Prism from 'prismjs';
import headerImage from '../../assets/images/header-image-2.svg';
import footerImage from '../../assets/images/footer-image.svg';

import Navbar from '../../components/Navbar';
import Head from '../../components/Head';
import '../../assets/stylesheets/index.sass';

const IndexLayout = ({children}) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <div>
        <Head
          siteTitle={data.site.siteMetadata.title}
          description={data.site.siteMetadata.description}
        />
        <div className="header-image">
          <img src={headerImage} alt="header image" />
        </div>
        <Navbar />
        <div>{children}</div>
        <div className="footer">
          <span className="copyright">
            Copyright © 2018 So Far , So Tech All Rights Reserved.
          </span>
        </div>
        <div className="footer-image">
          <img src={footerImage} alt="footer image" />
        </div>
      </div>
    )}
  />
);

export default IndexLayout;
