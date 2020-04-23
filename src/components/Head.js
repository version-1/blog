import React, {PureComponent} from 'react';
import Helmet from 'react-helmet';
import favicon from 'assets/images/favicon.ico';
import { meta } from 'config/constants';
import { isStrictProduction } from 'lib/env'

export default class Meta extends PureComponent {
  render() {
    const {amp, baseUrl, siteTitle, description} = this.props;
    const amphtml = baseUrl + '/amp';

    return (
      <Helmet>
        <html lang="en" />
        <title>{siteTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={baseUrl} />
        { amp && <link rel="amphtml" href={amphtml} /> }
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.siteUrl} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:site_name" content={siteTitle} />
        <meta
          property="og:image"
          content={meta.logo}
        />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" content="ver-1-0.net" />
        <meta name="twitter:creator" content="@version1_2017" />
        <meta name="twitter:site" content="@version1_2017" />
        <link rel="shortcut icon" href={favicon} />
        { (isStrictProduction && !amp) && <script
          async
          src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        /> }
      </Helmet>
    );
  }
}
