import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import favicon from 'assets/images/favicon.ico'
import { meta } from 'config/constants'

export default class Head extends PureComponent {
  render() {
    const {
      lang = 'en',
      baseUrl,
      siteTitle,
      description,
      image,
      metaTag
    } = this.props

    return (
      <Helmet
        htmlAttribtues={{
          lang
        }}
        title={siteTitle}
        meta={[
          {
            name: `description`,
            content: description
          },
          {
            property: `canonical`,
            content: baseUrl
          },
          {
            property: `og:description`,
            content: description
          },
          {
            property: `og:type`,
            content: `website`
          },
          {
            property: `og:image`,
            content: image || meta.logo
          },
          {
            property: `og:locale`,
            content: 'ja_JP'
          },
          {
            name: `twitter:card`,
            content: `summary`
          },
          {
            name: `twitter:creator`,
            content: `@version1_2017`
          },
          {
            name: `og:title`,
            content: siteTitle
          },
          {
            name: `og:site_name`,
            content: siteTitle
          },
          {
            name: `twitter:domain`,
            content: 'ver-1-0.net'
          }
        ].concat(metaTag || [])}
      >
        <link rel="shortcut icon" href={favicon} />
      </Helmet>
    )
  }
}
