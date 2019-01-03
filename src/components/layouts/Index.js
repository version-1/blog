import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import Prism from 'prismjs';
import Helmet from 'react-helmet';
import headerImage from '../../assets/images/header-image-2.svg';
import headerImageSmall from '../../assets/images/header-image-small.svg';
import footerImage from '../../assets/images/footer-image.svg';

import Img from '../../components/atoms/Image';
import Navbar from '../../components/Navbar';
import Head from '../../components/Head';
import '../../assets/stylesheets/index.sass';

const boilerPlate =
  'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}';
const boilerPlateNoScript =
  '<style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>';

export default class IndexLayout extends React.PureComponent {
  componentDidMount() {
    const {amp} = this.props;
    if (amp) {
      document.querySelector('html').setAttribute('amp', 'amp');
    }
  }

  renderAMPHeader() {
    const {basePath, amp} = this.props;
    if (amp) {
      return (
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width,minimum-scale=1,initial-scale=1"
          />
          <style amp-boilerplate>{boilerPlate}</style>
          <noscript dangerouslySetInnerHTML={{__html: boilerPlateNoScript}} />
          <script async src="https://cdn.ampproject.org/v0.js" />
        </Helmet>
      );
    }
  }
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
            {this.renderAMPHeader()}
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
            <Navbar />
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
