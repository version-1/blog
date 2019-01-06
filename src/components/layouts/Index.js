import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import Prism from 'prismjs';
import headerImage from '../../assets/images/header-image-2.svg';
import headerImageSmall from '../../assets/images/header-image-small.svg';
import footerImage from '../../assets/images/footer-image.svg';

import Img from '../../components/atoms/Image';
import Navbar from '../../components/Navbar';
import Head from '../../components/Head';
import '../../assets/stylesheets/index.sass';

export default class IndexLayout extends React.PureComponent {
  render() {
    const {amp, baseUrl} = this.props;
    const {children} = this.props;
    return (
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
              baseUrl={baseUrl}
              siteTitle={data.site.siteMetadata.title}
              description={data.site.siteMetadata.description}
            />
            <div className="header-image hide-on-med-and-down">
              <Img
                amp={amp}
                width={4000}
                height={300}
                layout="fixed"
                src={headerImage}
                alt="header image"
              />
            </div>
            <div className="header-image-small hide-on-large-only">
              <Img
                amp={amp}
                width={2000}
                height={150}
                layout="fixed"
                src={headerImageSmall}
                alt="header image"
              />
            </div>
            <Navbar amp={amp}/>
            <div>{children}</div>
            <div className="footer">
              <span className="copyright">
                Copyright © 2018 So Far , So Tech All Rights Reserved.
              </span>
            </div>
            <div className="footer-image">
              <Img
                amp={amp}
                width={4000}
                height={300}
                layout="fixed"
                src={footerImage}
                alt="footer image"
              />
            </div>
          </div>
        )}
      />
    );
  }
}
