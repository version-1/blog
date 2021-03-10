import React from 'react'
import { Helmet } from 'react-helmet'
import { meta as siteMeta } from 'config/constants'

const locale = {
  ja: 'ja_JP',
  en: 'en_US'
}

const Head = ({ lang = 'en', meta = {} }) => {
  const { canonical, alternate } = meta
  const _title = meta.title ? `%s | ${siteMeta.title}`.replace('%s', meta.title) : siteMeta.title
  const _description = meta.description || siteMeta.description
  const _url = meta.url || siteMeta.siteUrl
  const thumbnail = meta.image || siteMeta.logo

  return (
    <Helmet
      htmlAttributes={{ lang }}
    >
      <title>{_title}</title>
      {canonical && <link rel="canonical" href={canonical} />}
      {
        alternate && Object.keys(alternate).map(key => {
          return <link key={key} rel="alternate" href={siteMeta.siteUrl + alternate[key]} hreflang={key} />
        })
      }
      <meta name="description" content={_description} />
      <meta property="og:description" content={_description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={_url} />
      <meta property="og:title" content={_title} />
      <meta property="og:site_name" content={siteMeta.title} />
      <meta property="og:image" content={thumbnail} />
      <meta property="og:locale" content={locale[lang]} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:domain" content="ver-1-0.net" />
      <meta name="twitter:creator" content="@version1_2017" />
      <meta name="twitter:site" content="@version1_2017" />
    </Helmet>
  )
}

export default Head
