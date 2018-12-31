import React, {PureComponent} from 'react';
import Helmet from 'react-helmet';
import favicon from '../assets/images/favicon.ico';

export default class Meta extends PureComponent {
  render() {
    const {baseUrl, siteTitle, description} = this.props;
    return (
      <Helmet>
        <html lang="en" />
        <title>{siteTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={baseUrl} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ver-1-0.net/" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:site_name" content={siteTitle} />
        <meta
          property="og:image"
          content="https://ver-1-0.net/wp-content/uploads/2017/11/cropped-ver-1-0-logo.jpg"
        />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" content="ver-1-0.net" />
        <meta name="twitter:creator" content="@version1_2017" />
        <meta name="twitter:site" content="@version1_2017" />
        <link rel="shortcut icon" href={favicon} />
      </Helmet>
    );
  }
}
